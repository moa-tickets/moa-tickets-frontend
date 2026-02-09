import { cn } from '@/shared';
import CommonBrandBanner from '@/shared/components/common-brand-banner/CommonBrandBanner';
import MainBannerSlides from '@/widgets/main-banner-slides/MainBannerSlides';

const MainPage = () => {
  return (
    <div className={cn('main__page w-full')}>
      <MainBannerSlides />
      <CommonBrandBanner title="감자 브랜드" />
    </div>
  );
};

export default MainPage;
