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
      className={cn(
        'main__banner__text w-full absolute lg:top-0 bottom-[80px] left-0 z-[50]',
      )}
      ref={ref}
    >
      <div
        className={cn(
          'main__banner__inner lg:max-w-[1100px] max-w-[85%] mx-auto',
        )}
        style={{ color: color }}
      >
        {isIntersecting ? (
          <>
            <div
              className={cn(
                'big__text mt-[70px] mb-[20px] lg:text-[36px] text-[48px] font-bold',
              )}
            >
              {bigText.split('|').map((split: string) => (
                <span key={split} className={cn('block')}>
                  {split}
                </span>
              ))}
            </div>
            <div
              className={cn('medium__text text-[20px] lg:mb-[50px] mb-[20px]')}
            >
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
