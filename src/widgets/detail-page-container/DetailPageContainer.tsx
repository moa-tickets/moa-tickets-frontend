import React, { useState } from 'react';
import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import { cn } from '@/shared';
import StateButton from '@/shared/components/state-button/StateButton';
import DetailPageFunctions from '../detail-page-functions/DetailPageFunctions';
import DetailSelectTab from '../detail-select-tab/DetailSelectTab';
import AudienceReview from '../audience-review/AudienceReview';

const topState = [
  {
    id: 1,
    title: '단독판매',
    isActive: true,
  },
  {
    id: 2,
    title: '안심예매',
    isActive: false,
  },
  {
    id: 3,
    title: '예매대기',
    isActive: false,
  },
];

const tabs = [
  {
    label: 'detail__info',
    value: '상세정보',
  },
  {
    label: 'review',
    value: '관람후기',
  },
  {
    label: 'place__info',
    value: '장소정보',
  },
  {
    label: 'community',
    value: '커뮤니티',
  },
];

const DetailPageContainer = React.memo(({ data }: { data: ProductDetail }) => {
  const [selectedTab, setSelectedTab] = useState<string>('상세정보');

  return (
    <div className={cn('detail__page__container', 'mt-[14px] relative')}>
      <div className={cn('detail__page__inner', 'max-w-[1080px] mx-auto')}>
        <div className={cn('detail__page__top flex gap-[8px] mb-[30px]')}>
          {topState.map(
            (text: { id: number; title: string; isActive: boolean }) => (
              <StateButton
                key={text.id}
                title={text.title}
                isActive={text.isActive}
              />
            ),
          )}
        </div>
        <h2 className={cn('text-[24px] font-bold mb-[20px]')}>
          {data.concertName}
        </h2>
        <span className={cn('font-light inline-block mb-[30px]')}>콘서트</span>
        <DetailPageFunctions data={data} />
        <DetailSelectTab
          lists={tabs}
          selectedTab={selectedTab}
          onChange={(element: string) => setSelectedTab(element)}
        />
        {selectedTab === '관람후기' && <AudienceReview />}
      </div>
    </div>
  );
});

export default DetailPageContainer;
