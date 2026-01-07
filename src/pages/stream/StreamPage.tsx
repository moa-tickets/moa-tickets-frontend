import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useNavigate, useParams } from "react-router-dom";

export default function StreamPage() {
    const { playbackId } = useParams<{ playbackId: string }>();
    const navigate = useNavigate();

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    // pause/resume 복구용
    const userPausedRef = useRef(false);

    const [status, setStatus] = useState<
        "idle" | "loading" | "ready" | "playing" | "reconnecting" | "recovering" | "error"
    >("idle");

    // hls를 완전히 재생성(리로드)하기 위한 키
    const [reloadKey, setReloadKey] = useState(0);

    const [messages, setMessages] = useState<Array<{ id: number; text: string }>>(
        []
    );
    const [input, setInput] = useState("");

    const log = (...args: any[]) => console.log("[StreamPage]", ...args);
    const warn = (...args: any[]) => console.warn("[StreamPage]", ...args);
    const err = (...args: any[]) => console.error("[StreamPage]", ...args);

    const goLive = (video: HTMLVideoElement, hls?: Hls | null) => {
        try {
            // hls.js가 제공하는 liveSyncPosition이 가장 정확
            if (hls) {
                const p = (hls as any).liveSyncPosition as number | undefined;
                if (typeof p === "number" && Number.isFinite(p)) {
                    video.currentTime = Math.max(0, p - 0.2);
                    return;
                }
            }

            // 일반 케이스: seekable의 end로 점프
            const s = video.seekable;
            if (s && s.length > 0) {
                const end = s.end(s.length - 1);
                video.currentTime = Math.max(0, end - 0.2);
            }
        } catch (e) {
            warn("goLive failed", e);
        }
    };

    // ✅ “강제 복구” 버튼이 호출할 핵심 함수
    const resumePlayback = async () => {
        const v = videoRef.current;
        if (!v) return;

        const hls = hlsRef.current;

        log("resumePlayback() start", { readyState: v.readyState, paused: v.paused });

        try {
            // 1) hls.js이면 로딩 재개
            if (hls) {
                try {
                    hls.startLoad(-1);
                } catch (e) {
                    warn("startLoad failed", e);
                }
            }

            // 2) live-edge로 점프
            goLive(v, hls);

            // 3) play 시도
            await v.play();
            userPausedRef.current = false;
            setStatus("playing");
            log("resumePlayback() success");
            return;
        } catch (e) {
            warn("resumePlayback() play failed -> will hard reload hls", e);
        }

        // 4) 그래도 안 되면 Hls 인스턴스 재생성(리로드)
        setReloadKey((k) => k + 1);
    };

    // autoplay 정책 대응: 최초는 muted
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
        v.playsInline = true;
    }, []);

    // 비디오 이벤트로 status 갱신 (LIVE 표시 정확)
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onPlaying = () => setStatus("playing");
        const onWaiting = () => setStatus("loading");
        const onPause = () => {
            // 사용자가 멈춘 것만 추적 (스트림 자체 문제로 멈춘 건 resume 버튼으로 대응)
            userPausedRef.current = true;
            setStatus("ready");
        };
        const onPlay = () => {
            // 사용자가 play를 눌렀을 때 “live로 점프 + 로딩 재개” (브라우저가 안 해줄 때 대비)
            const hls = hlsRef.current;
            if (hls) {
                try {
                    hls.startLoad(-1);
                } catch {}
            }
            goLive(v, hls);
        };
        const onEnded = () => {
            // 라이브에서 ended가 뜨는 건 사실상 “EOS로 굳음”인 경우가 많음
            // 여기서 ready로 내려서 resume 버튼이 보이게 함
            setStatus("ready");
        };
        const onError = () => setStatus("error");

        v.addEventListener("playing", onPlaying);
        v.addEventListener("waiting", onWaiting);
        v.addEventListener("pause", onPause);
        v.addEventListener("play", onPlay);
        v.addEventListener("ended", onEnded);
        v.addEventListener("error", onError);

        return () => {
            v.removeEventListener("playing", onPlaying);
            v.removeEventListener("waiting", onWaiting);
            v.removeEventListener("pause", onPause);
            v.removeEventListener("play", onPlay);
            v.removeEventListener("ended", onEnded);
            v.removeEventListener("error", onError);
        };
    }, []);

    // ✅ 스트림 초기화: playbackId + reloadKey
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !playbackId) return;

        const streamUrl = `https://app.moatickets.dev/hls/${playbackId}/index.m3u8`;

        setStatus("loading");
        log("init", { playbackId, streamUrl, reloadKey });

        const cleanup = () => {
            if (hlsRef.current) {
                try {
                    hlsRef.current.destroy();
                } catch {}
                hlsRef.current = null;
            }
        };

        const canPlayNative =
            video.canPlayType("application/vnd.apple.mpegurl") !== "";

        if (canPlayNative) {
            log("Using native HLS");
            video.src = streamUrl;

            const onLoaded = () => {
                setStatus("ready");
                // 처음 붙을 때도 live로 한 번 점프
                goLive(video, null);
            };

            const onErr = () => {
                setStatus("error");
                err("Native video error", {
                    code: video.error?.code,
                    message: video.error?.message,
                });
            };

            video.addEventListener("loadedmetadata", onLoaded);
            video.addEventListener("error", onErr);

            video.play().catch((e) => warn("play blocked", e));

            return () => {
                video.removeEventListener("loadedmetadata", onLoaded);
                video.removeEventListener("error", onErr);
                cleanup();
            };
        }

        if (!Hls.isSupported()) {
            setStatus("error");
            err("HLS not supported");
            return () => cleanup();
        }

        const hls = new Hls({
            // ✅ 지연 줄이기/라이브 안정화
            lowLatencyMode: true,
            liveDurationInfinity: true,

            // 버퍼 과하게 쌓이면 라이브가 점점 늦어짐
            backBufferLength: 10,
            maxBufferLength: 10,

            // 라이브 엣지 추적 성향 강화 (상황에 따라 튜닝)
            liveSyncDurationCount: 2,
            liveMaxLatencyDurationCount: 4,
            maxLiveSyncPlaybackRate: 1.5,
        });

        hlsRef.current = hls;

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            setStatus("loading");
            hls.loadSource(streamUrl);
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setStatus("ready");
            // 처음 붙자마자 live로 점프 + play
            goLive(video, hls);
            video.play().catch((e) => warn("play blocked", e));
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
            // UI에 표시하지 않고 콘솔로만
            if (!data) return;

            if (!data.fatal) {
                warn("HLS non-fatal", { type: data.type, details: data.details });
                return;
            }

            err("HLS fatal", { type: data.type, details: data.details });

            switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    setStatus("reconnecting");
                    try {
                        hls.startLoad(-1);
                    } catch {}
                    // 네트워크 에러 후엔 라이브로 한 번 더 점프
                    goLive(video, hls);
                    break;

                case Hls.ErrorTypes.MEDIA_ERROR:
                    setStatus("recovering");
                    try {
                        hls.recoverMediaError();
                    } catch {}
                    goLive(video, hls);
                    break;

                default:
                    setStatus("error");
                    cleanup();
            }
        });

        hls.attachMedia(video);

        return () => cleanup();
    }, [playbackId, reloadKey]);

    const sendChat = () => {
        const text = input.trim();
        if (!text) return;
        setMessages((prev) => [...prev, { id: Date.now(), text }]);
        setInput("");
    };

    // resume 버튼 표시 조건:
    // - 사용자가 멈췄거나(paused) / ready 상태인데 play가 죽어있을 때 대비해서
    const showResume =
        status === "ready" && (userPausedRef.current || videoRef.current?.paused);

    return (
        <div className="h-screen w-screen bg-zinc-950 text-zinc-100">
            <div className="fixed left-4 top-4 z-50">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-100 backdrop-blur hover:bg-zinc-800/80 active:scale-[0.99]"
                    aria-label="Back"
                >
                    <span className="text-lg leading-none">←</span>
                    <span>Back</span>
                </button>
            </div>

            <div className="flex h-full w-full flex-col px-3 py-3 lg:px-4 lg:py-4">
                <div className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-[7fr_2fr]">
                    {/* Video */}
                    <div className="relative h-full overflow-hidden rounded-2xl bg-black">
                        <video ref={videoRef} controls className="h-full w-full" playsInline />

                        {/* Status */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-end p-3">
                            <div className="flex items-center gap-2 rounded-full bg-zinc-900/60 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
                                {status === "playing" && (
                                    <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 font-medium">LIVE</span>
                  </span>
                                )}
                                {status === "loading" && "Loading…"}
                                {status === "reconnecting" && "Reconnecting…"}
                                {status === "recovering" && "Recovering…"}
                                {status === "ready" && "Ready"}
                                {status === "error" && "Error"}
                                {status === "idle" && "Idle"}
                            </div>
                        </div>

                        {/* ✅ Pause 후 play 버튼이 죽는 케이스를 위해 "Resume/Go Live" 오버레이 */}
                        {showResume && (
                            <div className="absolute inset-0 z-20 grid place-items-center">
                                <button
                                    type="button"
                                    onClick={resumePlayback}
                                    className="rounded-full bg-zinc-100/10 px-5 py-3 text-sm font-semibold text-zinc-100 backdrop-blur hover:bg-zinc-100/15 active:scale-[0.99]"
                                >
                                    Resume / Go Live
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Chat */}
                    <div className="flex h-full min-w-[320px] flex-col overflow-hidden rounded-2xl bg-zinc-900/40">
                        <div className="flex-1 space-y-2 overflow-auto p-3">
                            {messages.length === 0 ? (
                                <div className="rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm text-zinc-400">
                                    채팅 연결 전이라 UI만 비워둠
                                </div>
                            ) : (
                                messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className="rounded-2xl bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100"
                                    >
                                        {m.text}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-3">
                            <div className="flex items-center gap-2">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") sendChat();
                                    }}
                                    placeholder="메시지 입력 (지금은 로컬에만 쌓임)"
                                    className="h-11 flex-1 rounded-full bg-zinc-950/50 px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-600"
                                />
                                <button
                                    type="button"
                                    onClick={sendChat}
                                    className="h-11 rounded-full bg-zinc-100/10 px-4 text-sm font-medium text-zinc-100 hover:bg-zinc-100/15 active:scale-[0.99]"
                                >
                                    Send
                                </button>
                            </div>

                            <p className="mt-2 text-xs text-zinc-500">
                                나중에 여기 STOMP/WS 붙이면 됨.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-3 text-xs text-zinc-600">
                    * Pause 후 재생이 안 붙는 브라우저 케이스 대비해서 Resume/Go Live 버튼으로 강제 복구함.
                </div>
            </div>
        </div>
    );
}
