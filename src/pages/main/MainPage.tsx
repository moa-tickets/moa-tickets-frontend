import { cn } from '@/shared';

import MainBannerSlides from '@/widgets/main-banner-slides/MainBannerSlides';

const MainPage = () => {
  return (
    <div className={cn('main__page w-full')}>
      <MainBannerSlides />
    </div>
  );
};

export default MainPage;
