import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface MessageResponseDto {
    senderNickname: string;
    message: string;
}

const SOCKET_URL = "http://localhost:8080/ws/connect";

export default function StreamPage() {
    const { playbackId } = useParams<{ playbackId: string }>();
    const navigate = useNavigate();

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);
    const userPausedRef = useRef(false);

    const stompClientRef = useRef<Client | null>(null);
    const [messages, setMessages] = useState<Array<{ id: number; nickname: string; text: string }>>([]);
    const [input, setInput] = useState("");

    // ✅ 1. 자동 스크롤을 위한 Ref 추가
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const [status, setStatus] = useState<
      "idle" | "loading" | "ready" | "playing" | "reconnecting" | "recovering" | "error"
    >("idle");
    const [reloadKey, setReloadKey] = useState(0);

    const log = (...args: any[]) => console.log("[StreamPage]", ...args);
    const warn = (...args: any[]) => console.warn("[StreamPage]", ...args);
    const err = (...args: any[]) => console.error("[StreamPage]", ...args);

    // ✅ 2. 메시지가 추가될 때마다 맨 아래로 스크롤 이동
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!playbackId) return;

        const socket = new SockJS(SOCKET_URL);
        const client = new Client({
            webSocketFactory: () => socket as any,
            connectHeaders: { roomId: playbackId },
            onConnect: () => {
                log("STOMP Connected");
                client.subscribe("/queue/disconnect", (msg) => {
                    if (msg.body === "DUPLICATE_SESSION") {
                        alert("중복 접속으로 연결이 종료됩니다.");
                        client.deactivate();
                    }
                });

                client.subscribe(`/sub/${playbackId}/messages`, (tick) => {
                    if (tick.body) {
                        const data: MessageResponseDto = JSON.parse(tick.body);
                        setMessages((prev) => [
                            ...prev,
                            { id: Date.now(), nickname: data.senderNickname, text: data.message }
                        ]);
                    }
                });
            },
            onStompError: (frame) => {
                err("STOMP Error", frame);
                navigate("/login");
            },
            reconnectDelay: 5000,
        });

        const handleBeforeUnload = () => { if (client.connected) client.deactivate(); };
        window.addEventListener("beforeunload", handleBeforeUnload);
        client.activate();
        stompClientRef.current = client;

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            client.deactivate();
        };
    }, [playbackId, navigate]);

    const sendChat = () => {
        const text = input.trim();
        if (!text || !stompClientRef.current?.connected) return;

        stompClientRef.current.publish({
            destination: `/pub/send/${playbackId}`,
            body: JSON.stringify({ message: text }),
        });
        setInput("");
    };

    // 비디오 관련 함수 (기존 유지)
    const goLive = (video: HTMLVideoElement, hls?: Hls | null) => { /* ... */ };
    const resumePlayback = async () => { /* ... */ };

    return (
      <div className="h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden flex flex-col">
          {/* 상단 Back 버튼 */}
          <div className="p-4 flex-none">
              <button onClick={() => navigate(-1)} className="bg-zinc-900/70 px-4 py-2 rounded-full text-white">← Back</button>
          </div>

          <div className="flex-1 min-h-0 px-3 pb-3 lg:px-4 lg:pb-4">
              {/* ✅ grid 부모에 min-h-0을 주어야 내부 flex-1이 정상 작동합니다. */}
              <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-[7fr_2fr] min-h-0">

                  {/* Video 영역 */}
                  <div className="relative h-full overflow-hidden rounded-2xl bg-black border border-zinc-800">
                      <video ref={videoRef} controls className="h-full w-full object-contain" playsInline />
                  </div>

                  {/* Chat 영역 */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-zinc-900/40 border border-zinc-800">
                      {/* 헤더 (고정) */}
                      <div className="p-3 border-b border-zinc-800 bg-zinc-900/60 font-bold text-sm flex items-center gap-2 text-white flex-none">
                          <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                          Live Chat
                      </div>

                      {/* ✅ 채팅 메시지 리스트 (이 부분만 스크롤됨) */}
                      <div className="flex-1 overflow-y-auto p-3 bg-zinc-950/20 min-h-0 custom-scrollbar">
                          {messages.length === 0 ? (
                            <div className="text-center py-10 text-xs text-zinc-600">대화를 시작해보세요!</div>
                          ) : (
                            messages.map((m) => (
                              <div key={m.id} className="flex flex-col gap-1 mb-3">
                                  <span className="text-[11px] font-bold text-zinc-500">{m.nickname}</span>
                                  <div className="rounded-2xl rounded-tl-none bg-zinc-800/60 px-3 py-2 text-sm text-zinc-100 w-fit max-w-[90%] break-words">
                                      {m.text}
                                  </div>
                              </div>
                            ))
                          )}
                          <div ref={messageEndRef} />
                      </div>

                      {/* 메시지 입력창 (고정) */}
                      <div className="p-3 bg-zinc-900/40 border-t border-zinc-800 flex-none">
                          <div className="flex items-center gap-2">
                              <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.nativeEvent.isComposing) return;
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        sendChat();
                                    }
                                }}
                                placeholder="메시지를 입력하세요..."
                                className="h-10 flex-1 rounded-xl bg-zinc-950/80 px-4 text-sm text-zinc-100 outline-none border border-zinc-700 focus:border-zinc-500"
                              />
                              <button
                                type="button"
                                onClick={sendChat}
                                disabled={!input.trim()}
                                className="h-10 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 disabled:opacity-50"
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