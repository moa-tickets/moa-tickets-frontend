import { cn } from '@/shared';

import MainBannerSlides from '@/widgets/main-banner-slides/MainBannerSlides';
import MainContentsWrapper from '@/shared/components/main-contents-wrapper/MainContentsWrapper';

const MainPage = () => {
  return (
    <div className={cn('main__page w-full')}>
      <MainBannerSlides />
      <MainContentsWrapper title="콘서트 랭킹" isAll={'콘서트 랭킹 전체보기'} />
      <MainContentsWrapper
        title="오픈 예정"
        isAll={'오픈 예정 공연 전체보기'}
      />
      <MainContentsWrapper title="플레이" isTab />
      <MainContentsWrapper title="추천 키워드" isTab />
    </div>
  );
};

export default MainPage;
