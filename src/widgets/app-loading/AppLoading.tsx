import { cn } from '@/shared';

export default function AppLoading() {
  return (
    <div
      className={cn(
        'loading-screen',
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-[10000]',
      )}
    >
      <img src={'/girlShadow.gif'} alt="loading" className="w-[170px]" />
      <span className="mt-4 text-gray-900 animate-pulse">
        로딩 중입니다. 잠시만 기다려주세요.
      </span>
    </div>
  );
}
