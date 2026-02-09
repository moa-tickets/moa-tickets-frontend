import { cn } from '@/shared';

export default function CommunityList() {
  return (
    <div className={cn('community__list')}>
      <div className={cn('community__list__inner', 'max-w-[1080px] mx-auto')}>
        <h2
          className={cn(
            'text-[22px] font-bold',
            'pb-[18px] border-b border-solid border-black',
            'mb-[20px]',
          )}
        >
          커뮤니티
        </h2>
      </div>
    </div>
  );
}
