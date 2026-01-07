import { cn } from '@/shared';

import MainBannerSlides from '@/widgets/main-banner-slides/MainBannerSlides';
import BannerGrid from '@/widgets/banner-grid/BannerGrid';
import MainContentsWrapper from '@/shared/components/main-contents-wrapper/MainContentsWrapper';
import { useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  useEffect(() => {
    axios
      .get('https://app.moatickets.dev/health', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  return (
    <div className={cn('main__page w-full')}>
      <MainBannerSlides />
      <BannerGrid />
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
