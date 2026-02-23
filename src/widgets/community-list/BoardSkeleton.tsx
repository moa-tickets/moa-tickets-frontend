import { cn } from '@/shared';

export default function BoardSkeleton() {
  return (
    <div
      className={cn(
        'absolute inset-0 grid grid-cols-3 gap-[8px] mb-[20px] z-[-1]',
      )}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={cn('h-[220px] border border-dashed border-#ccc')}
        ></div>
      ))}
    </div>
  );
}
