import { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

interface MessageResponseDto {
    senderNickname: string;
    message: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const SOCKET_URL = API_BASE + "/ws/connect";

export default function StreamPage() {
    const { playbackId } = useParams<{ playbackId: string }>();
    const navigate = useNavigate();

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);
    const stompClientRef = useRef<Client | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [messages, setMessages] = useState<Array<{ id: number; nickname: string; text: string }>>([]);
    const [input, setInput] = useState("");

    // 커서 기반 페이지네이션 상태
    const [lastSeenId, setLastSeenId] = useState<number | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const isFirstLoad = useRef(true);

    const [status, setStatus] = useState<"idle" | "loading" | "ready" | "playing" | "error">("idle");

    // ✅ 커서 방식(lastSeenId)으로 채팅 내역 가져오기
    const fetchChatHistory = useCallback(async () => {
        if (!playbackId || isFetching || !hasMore) return;

        setIsFetching(true);
        try {
            const response = await axios.get(`${API_BASE}/chat/history/${playbackId}`, {
                params: {
                    lastSeenId: lastSeenId, // null이면 최신, 값이 있으면 그 이전 데이터
                    size: 20
                },
                withCredentials: true
            });

            // 서버 응답: [{id: 10, ...}, {id: 9, ...}] (최신순 DESC 정렬 상태 가정)
            const history = response.data.map((chat: any) => ({
                id: chat.chatMessageId,
                nickname: chat.senderNickname,
                text: chat.message
            }));

            if (history.length < 20) setHasMore(false);

            const container = scrollContainerRef.current;
            const previousScrollHeight = container?.scrollHeight || 0;

            // 과거 내역은 리스트의 '앞'에 추가
            // history가 [10, 9, 8] 순서라면 .reverse()해서 [8, 9, 10]으로 만든 뒤 붙임
            setMessages((prev) => [...history.reverse(), ...prev]);

            // 다음 요청을 위한 커서 업데이트 (가장 과거 ID 저장)
            if (history.length > 0) {
                // reverse 했으므로 0번째 인덱스가 현재 가져온 것 중 가장 오래된 ID
                setLastSeenId(history[history.length - 1].id);
            }

            // 스크롤 위치 조정
            setTimeout(() => {
                if (container) {
                    if (isFirstLoad.current) {
                        container.scrollTop = container.scrollHeight;
                        isFirstLoad.current = false;
                    } else {
                        // 위로 추가된 메시지 높이만큼 스크롤 위치 유지
                        container.scrollTop = container.scrollHeight - previousScrollHeight;
                    }
                }
            }, 1);

        } catch (e) {
            console.error("[StreamPage] Failed to fetch chat history", e);
        } finally {
            setIsFetching(false);
        }
    }, [playbackId, isFetching, hasMore, lastSeenId]);

    // ✅ 스크롤 이벤트 핸들러
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = e.currentTarget;
        // 맨 위에 닿았을 때 추가 로드
        if (scrollTop === 0 && hasMore && !isFetching) {
            fetchChatHistory();
        }
    };

    useEffect(() => {
        if (!playbackId) return;

        // 1. 초기 데이터 로드
        fetchChatHistory();

        // 2. WebSocket 연결
        const socket = new SockJS(SOCKET_URL);
        const client = new Client({
            webSocketFactory: () => socket as any,
            connectHeaders: { roomId: playbackId },
            onConnect: () => {
                client.subscribe(`/sub/${playbackId}/messages`, (tick) => {
                    if (tick.body) {
                        const data: MessageResponseDto = JSON.parse(tick.body);
                        setMessages((prev) => [
                            ...prev,
                            { id: Date.now(), nickname: data.senderNickname, text: data.message }
                        ]);

                        // 새 메시지 수신 시 스크롤 하단 이동 (선택적: 사용자가 보고 있을 때만 이동하게 개선 가능)
                        setTimeout(() => {
                            if (scrollContainerRef.current) {
                                scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
                            }
                        }, 50);
                    }
                });
            },
            onStompError: () => navigate("/login"),
        });

        client.activate();
        stompClientRef.current = client;

        // 3. 비디오 HLS 설정
        const video = videoRef.current;
        if (video) {
            const streamUrl = `https://app.moatickets.dev/hls/${playbackId}/index.m3u8`;
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(streamUrl);
                hls.attachMedia(video);
                hlsRef.current = hls;
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    setStatus("playing");
                    video.play().catch(() => {});
                });
            }
        }

        return () => {
            if (stompClientRef.current) stompClientRef.current.deactivate();
            if (hlsRef.current) hlsRef.current.destroy();
        };
    }, [playbackId]);

    const sendChat = () => {
        const text = input.trim();
        if (!text || !stompClientRef.current?.connected) return;

        stompClientRef.current.publish({
            destination: `/pub/send/${playbackId}`,
            body: JSON.stringify({ message: text }),
        });
        setInput("");
    };

    return (
      <div className="h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden flex flex-col">
          <div className="p-4 flex-none flex items-center justify-between">
              <button onClick={() => navigate(-1)} className="bg-zinc-900/70 px-4 py-2 rounded-full text-white hover:bg-zinc-800 transition-colors text-sm">← Back</button>
              <div className="text-xs text-zinc-500 font-mono">{playbackId}</div>
          </div>

          <div className="flex-1 min-h-0 px-3 pb-3 lg:px-4 lg:pb-4">
              <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-[7fr_2fr] min-h-0">
                  {/* 비디오 영역 */}
                  <div className="relative h-full overflow-hidden rounded-2xl bg-black border border-zinc-800 flex items-center justify-center">
                      <video ref={videoRef} controls className="h-full w-full object-contain" playsInline />
                  </div>

                  {/* 채팅 영역 */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-zinc-900/40 border border-zinc-800 shadow-2xl">
                      <div className="p-3 border-b border-zinc-800 bg-zinc-900/60 font-bold text-sm flex items-center gap-2 text-white flex-none">
                          <span className={`h-2 w-2 rounded-full transition-all duration-500 ${status === 'playing' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-zinc-500'}`} />
                          Live Chat
                      </div>

                      <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto p-3 bg-zinc-950/20 min-h-0 custom-scrollbar flex flex-col"
                      >
                          {isFetching && <div className="text-center text-[10px] text-zinc-500 py-2 animate-pulse">이전 대화 불러오는 중...</div>}

                          <div className="mt-auto"> {/* 위로 쌓이는 레이아웃 유도 */}
                              {messages.length === 0 && !isFetching ? (
                                <div className="text-center py-10 text-xs text-zinc-600">대화를 시작해보세요!</div>
                              ) : (
                                messages.map((m) => (
                                  <div key={m.id} className="flex flex-col gap-1 mb-4 group">
                                      <span className="text-[11px] font-bold text-zinc-500 group-hover:text-zinc-400 transition-colors">{m.nickname}</span>
                                      <div className="rounded-2xl rounded-tl-none bg-zinc-800/60 px-3 py-2 text-sm text-zinc-100 w-fit max-w-[95%] break-words shadow-sm">
                                          {m.text}
                                      </div>
                                  </div>
                                ))
                              )}
                          </div>
                      </div>

                      <div className="p-3 bg-zinc-900/40 border-t border-zinc-800 flex-none">
                          <div className="flex items-center gap-2">
                              <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                                        e.preventDefault();
                                        sendChat();
                                    }
                                }}
                                placeholder="메시지를 입력하세요..."
                                className="h-11 flex-1 rounded-xl bg-zinc-950/80 px-4 text-sm text-zinc-100 outline-none border border-zinc-700 focus:border-indigo-500 transition-all placeholder:text-zinc-600"
                              />
                              <button
                                type="button"
                                onClick={sendChat}
                                disabled={!input.trim()}
                                className="h-11 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 disabled:opacity-30 disabled:active:scale-100 transition-all shadow-lg shadow-indigo-500/20"
                              >
                                  전송
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}