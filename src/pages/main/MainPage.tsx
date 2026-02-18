import { cn } from '@/shared';
import MainBannerSlides from '@/widgets/main-banner-slides/MainBannerSlides';
import SideBanner from '@/widgets/side-banner/SideBanner';

const MainPage = () => {
  return (
    <div className={cn('main__page w-full relative')}>
      <div
        className={cn(
          'top__banner',
          'max-w-[1080px] mx-auto flex',
          'gap-[50px]',
        )}
      >
        <MainBannerSlides />
        <SideBanner />
      </div>
    </div>
  );
};

export default MainPage;
