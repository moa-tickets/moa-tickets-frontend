import { useEffect, useRef, useState } from 'react';
import YouTube, { type YouTubeProps, type YouTubePlayer } from 'react-youtube';
import Icon from '@/shared/lib/Icon';
import OptimizedImage from '@/shared/components/lazy-loading/LazyImage';
import Skeleton from '../skeleton/Skeleton';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const YoutubePlayers = ({
  videoId,
  thumbnailUrl,
}: {
  videoId: string;
  thumbnailUrl?: string;
}) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const progressRef = useRef<HTMLButtonElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    // YouTube Player States: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    const playerState = event.data;

    if (playerState === 1) {
      // 재생 중
      setIsPlaying(true);
      if (!hasStarted) {
        setHasStarted(true);
      }
    } else if (playerState === 2 || playerState === 0) {
      // 일시정지 또는 종료
      setIsPlaying(false);
    }
  };

  // 프로그레스바 업데이트
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        const time = playerRef.current?.getCurrentTime() || 0;
        const dur = playerRef.current?.getDuration() || 0;
        setCurrentTime(time);
        setDuration(dur);
        setProgress(dur > 0 ? (time / dur) * 100 : 0);
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // 프로그레스바 클릭으로 시간 이동
  const handleProgressClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!playerRef.current || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      controls: 0, // 기본 컨트롤러 숨기기
      rel: 0, // 관련 영상 숨기기
      disablekb: 1, // 키보드 조작 막기 (필요 시)
      modestbranding: 1, // 유튜브 로고 최소화
    },
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="w-full h-full"
        iframeClassName="w-full h-full"
      />
      {/* 초기 썸네일 + 재생 버튼 (재생 전에만 표시, YouTube 로고 가림) */}
      {!hasStarted && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black"
        >
          {thumbnailUrl && (
            <OptimizedImage
              src={thumbnailUrl}
              alt="video thumbnail"
              className="absolute inset-0 w-full h-full"
              skeletonComponent={
                <Skeleton className="w-full h-full bg-[#ccc]" />
              }
            />
          )}
          <div className="relative z-10 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <Icon ICON="PLAY" className="w-8 h-8 fill-white text-white ml-1" />
          </div>
        </button>
      )}

      {/* 컨트롤 바 (재생 시작 후 hover 시에만 표시) */}
      {hasStarted && (
        <div
          className={`absolute bottom-0 left-0 right-0 text-white p-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* 프로그레스바 */}
          <button
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3 group"
          >
            <div
              className="h-full bg-red-600 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>

          {/* 컨트롤 버튼 */}
          <div className="flex items-center gap-3">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <Icon ICON="PAUSE" className="w-6 h-6 fill-none" />
              ) : (
                <Icon ICON="PLAY" className="w-6 h-6 fill-none" />
              )}
            </button>

            <button onClick={toggleMute}>
              {isMuted ? (
                <Icon ICON="MUTE" className="w-6 h-6 fill-none" />
              ) : (
                <Icon ICON="VOLUME" className="w-6 h-6 fill-none" />
              )}
            </button>

            {/* 시간 표시 */}
            <span className="text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="ml-auto text-xs">모아티켓 라이브</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubePlayers;
