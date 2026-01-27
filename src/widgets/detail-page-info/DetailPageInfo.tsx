import type { ProductDetail } from '@/entities/reducers/ConcertDetailReducer';
import { cn } from '@/shared';
import DetailPageDescription from './DetailPageDescription';
import { useCallback, useState } from 'react';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import DetailPriceList from './DetailPriceList';

const DetailPageInfo = ({ data }: { data: ProductDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      {isModalOpen && (
        <ConfirmModal
          title={'정보'}
          message={<DetailPriceList list={data.sessions} />}
          isInfo
          isOpen={isModalOpen}
          onClose={onClose}
        />
      )}
      <div className={cn('detail__page__info')}>
        <div
          className={cn('detail___page__info__inner', 'max-w-[1080px] mx-auto')}
        >
          <DetailPageDescription title={'장소'} data={data.hallName} />
          <DetailPageDescription
            title={'오픈시간'}
            data={
              data.bookingOpen.split('T')[0].split('-')[0] +
              ' . ' +
              data.bookingOpen.split('T')[0].split('-')[1] +
              ' . ' +
              data.bookingOpen.split('T')[0].split('-')[2]
            }
          />
          <DetailPageDescription
            title={'공연기간'}
            data={
              data.bookingOpen.split('T')[0].replaceAll('-', '.') +
              ' ~ ' +
              data.concertEnd.split('T')[0].replaceAll('-', '.')
            }
          />
          <DetailPageDescription
            title={'관람연령'}
            data={data.age + '세 이상 관람 가능'}
          />
          <DetailPageDescription
            title={'가격'}
            data={data.sessions}
            isPrice
            buttonClick={() => setIsModalOpen(true)}
          />
          <DetailPageDescription title={'혜택'} data={'무이자할부'} />
        </div>
      </div>
    </>
  );
};

export default DetailPageInfo;
