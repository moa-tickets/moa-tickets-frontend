import { useState } from 'react';
import { cn } from '@/shared';
import CommonNavigationSlide from '../navigation-slide/CommonNavigationSlide';
import { concertRankSlides } from '@/entities/constant/concertRankSlides';
import { willOpenGrid } from '@/entities/constant/willOpenGrid';
import Icon from '@/shared/lib/Icon';
import SelectTab from '../select-tab/SelectTab';
import { PlayListMocks } from '@/entities/constant/PlayListMocks';

const MainContentsWrapper = ({
  title,
  isTab,
  isAll,
}: {
  title: string;
  isTab?: boolean;
  isAll?: string;
}) => {
  const playListKeys = Object.keys(PlayListMocks);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const selectedPlayList = PlayListMocks[playListKeys[selectedTab]];

  return (
    <div className={cn('main__contents__wrapper mt-[60px]')}>
      <div className={cn('main__contents max-w-[1080px] mx-auto')}>
        <h2 className={cn('text-center text-[22px] font-bold mb-[33px]')}>
          {title}
        </h2>
        {isTab && (
          <SelectTab
            contentKey={playListKeys}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        )}
        {title === '콘서트 랭킹' && (
          <CommonNavigationSlide
            type={'VERTICAL-5'}
            data={concertRankSlides}
            className={'vertical-5'}
          />
        )}
        {title === '오픈 예정' && (
          <CommonNavigationSlide
            type={'GRID'}
            data={willOpenGrid}
            className={'grid-type'}
          />
        )}
        {title === '플레이' && (
          <CommonNavigationSlide
            type={'VERTICAL-3'}
            data={selectedPlayList}
            className={'vertical-3'}
          />
        )}
        {isAll && (
          <button className="flex items-center gap-5 text-center mx-auto mt-[110px] px-[30px] py-[18px] border border-[#dddddd] rounded-[26px] cursor-pointer">
            <span>{isAll}</span>
            <Icon
              ICON={'RIGHT'}
              className={cn('w-[14px] h-[14px] fill-none')}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default MainContentsWrapper;
