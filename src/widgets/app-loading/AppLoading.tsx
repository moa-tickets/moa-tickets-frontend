import { cn } from '@/shared';

export default function AppLoading() {
  return (
    <div
      className={cn(
        'loading-screen',
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center',
      )}
    >
      <img src={'/girlShadow.gif'} alt="loading" className="w-[170px]" />
      <span className="mt-4 text-gray-500 animate-pulse">Loading...</span>
    </div>
  );
}
