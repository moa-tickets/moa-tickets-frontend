import { cn } from '@/shared';
import HomeMainBanner from '@/widgets/home-main-banner/HomeMainBanner';
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
        <div className={cn('top__banner__left')}>
          <MainBannerSlides />
          <HomeMainBanner title={'흥미로운 프로젝트'} />
        </div>
        <SideBanner />
      </div>
    </div>
  );
};

export default MainPage;
