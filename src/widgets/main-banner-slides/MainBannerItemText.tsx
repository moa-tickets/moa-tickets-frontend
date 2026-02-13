import useIntersect from '@/features/intersect/useIntersect';
import { cn } from '@/shared';
import Skeleton from '@/shared/components/skeleton/Skeleton';

const MainBannerItemText = ({
  bigText,
  smallText,
  mediumText,
  dateText,
  color,
}: {
  bigText: string;
  smallText: string;
  mediumText: string;
  dateText: string;
  color: string;
}) => {
  const { ref, isIntersecting } = useIntersect({
    threshold: 0.2,
    rootMargin: '100px',
  });

  return (
    <div
      className={cn('main__banner__text w-full absolute top-0 left-0 z-[50]')}
      ref={ref}
    >
      <div
        className={cn('main__banner__inner px-[60px]')}
        style={{ color: color }}
      >
        {isIntersecting ? (
          <>
            <div
              className={cn(
                'big__text mt-[70px] mb-[20px] text-[36px] font-bold',
              )}
            >
              {bigText.split('|').map((split: string) => (
                <span key={split} className={cn('block')}>
                  {split}
                </span>
              ))}
            </div>
            <div className={cn('medium__text text-[20px] mb-[50px]')}>
              {mediumText}
            </div>
            <div className={cn('small__text text-[20px]')}>{smallText}</div>
            <div className={cn('date__text text-[16px] mt-[10px]')}>
              {dateText}
            </div>
          </>
        ) : (
          <>
            <Skeleton
              className={cn('w-[200px] h-[54px] bg-[#000] mt-[70px] mb-[20px]')}
            />
            <Skeleton
              className={cn('w-[100px] h-[54px] bg-[#000] mb-[20px]')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MainBannerItemText;
