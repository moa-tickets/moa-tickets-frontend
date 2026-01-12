import { useEffect, useState } from 'react';
import { cn } from '@/shared';
import DetailDescription from '@/widgets/detail-description/DetailDescription';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import Icon from '@/shared/lib/Icon';
import OptimizedImage from '@/shared/components/lazy-loading/LazyImage';
import { useProductSearch } from '@/features/product-search/useProductSearch';
import PriceModal from '@/shared/components/price-modal/PriceModal';
import ConcertReviews from '@/widgets/concert-reviews/ConcertReviews';

const DetailPage = () => {
  console.log('DetailPage rendered');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('공연정보');
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const { getConcertDetail, concertDetail, isDetailLoading } =
    useProductSearch();

  const handleReservationClick = () => {
    navigate(`/detail/${id}/booking`);
  };

  const formatBookingOpenDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return { date: `${year}.${month}.${day}`, time: `${hours}:${minutes}` };
  };

  const isConcertEnded = () => {
    if (!concertDetail?.concertEnd) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(concertDetail.concertEnd);
    endDate.setHours(0, 0, 0, 0);
    return today > endDate;
  };

  useEffect(() => {
    getConcertDetail.mutate(Number(id));
  }, [id]);

  return (
    <div className={cn('detail__page__all bg-white min-h-screen mt-[50px]')}>
      <div
        className={cn('detail__page__wrapper max-w-[1280px] mx-auto px-[40px]')}
      >
        {isDetailLoading && (
          <div className={cn('flex justify-center items-center py-20')}>
            <span>로딩 중...</span>
          </div>
        )}

        <h1
          className={cn(
            'text-[26px] font-bold text-[#222222] leading-[39px] mb-[32px]',
          )}
        >
          {concertDetail?.concertName}
        </h1>

        <div className={cn('flex gap-[48px] mb-[20px]')}>
          <div className={cn('flex gap-[48px] flex-1')}>
            <div
              className={cn(
                'info__image w-[300px] h-[400px] border border-solid border-[#DADEE3] rounded-[15px] overflow-hidden flex-shrink-0',
              )}
            >
              <OptimizedImage
                src={concertDetail?.thumbnail!}
                alt="Detail Info"
                className={cn('w-full h-full')}
                skeletonClassName="rounded-[15px]"
              />
            </div>

            <div className={cn('info__description flex-1')}>
              <div className={cn('mb-[15px]')}>
                <DetailDescription
                  dd={'장소'}
                  dt={
                    <div className={cn('flex items-center gap-1')}>
                      <span>{concertDetail?.hallName}</span>
                      <Icon
                        ICON="ARROW_RIGHT"
                        className="w-[5px] h-[7px] text-[#666] ml-[10px]"
                      />
                    </div>
                  }
                />
              </div>

              <div className={cn('mb-[15px]')}>
                <DetailDescription
                  dd={'공연기간'}
                  dt={
                    concertDetail?.concertStart && concertDetail?.concertEnd
                      ? `${concertDetail.concertStart.split('T')[0]} ~ ${concertDetail.concertEnd.split('T')[0]}`
                      : ''
                  }
                />
              </div>

              <div className={cn('mb-[15px]')}>
                <DetailDescription
                  dd={'공연시간'}
                  dt={concertDetail?.concertDuration}
                />
              </div>

              <div className={cn('mb-[15px]')}>
                <DetailDescription
                  dd={'관람연령'}
                  dt={concertDetail?.age + '세 이상 관람가능'}
                />
              </div>

              <div className={cn('mb-[15px]')}>
                <DetailDescription
                  dd={'가격'}
                  dt={
                    <div className={cn('flex flex-col gap-[15px]')}>
                      <button
                        onClick={() => setIsPriceModalOpen(true)}
                        className={cn(
                          'flex items-center gap-1 text-[16px] font-bold text-black cursor-pointer',
                        )}
                      >
                        <span>전체가격보기</span>
                        <Icon
                          ICON="ARROW_RIGHT"
                          className="w-[5px] h-[7px] text-[#666] ml-[10px]"
                        />
                      </button>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          <div className={cn('w-[340px] flex-shrink-0')}>
            {concertDetail?.bookingOpen && (
              <div
                className={cn(
                  'border border-[#B6BDC7] rounded-[15px] p-[20px] mb-[20px]',
                )}
              >
                <h3
                  className={cn(
                    'text-[14px] font-bold text-center mb-[20px] text-black',
                  )}
                >
                  티켓오픈안내
                </h3>
                <div className={cn('flex flex-col items-center gap-[10px]')}>
                  <div className={cn('text-[28px] font-bold text-[#4154FF]')}>
                    {formatBookingOpenDateTime(concertDetail.bookingOpen).date}
                  </div>
                  <div className={cn('text-[32px] font-bold text-black')}>
                    {formatBookingOpenDateTime(concertDetail.bookingOpen).time}
                  </div>
                  <div className={cn('text-[12px] text-[#999] mt-[5px]')}>
                    오픈
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleReservationClick}
              disabled={isConcertEnded()}
              className={cn(
                'w-full h-[54px] text-white text-[18px] font-bold rounded-[10px] border',
                isConcertEnded()
                  ? 'bg-[#FF4154] border-[#FF4154] cursor-not-allowed opacity-60'
                  : 'bg-[#4154FF] border-[#4154FF] hover:bg-[#4154FF]/90 cursor-pointer',
              )}
            >
              {isConcertEnded() ? '공연종료' : '예매하기'}
            </Button>
          </div>
        </div>

        <div
          className={cn('border-b border-[#B6BDC7] flex gap-[28px] mb-[20px]')}
        >
          {['공연정보', '판매정보', '공연후기'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'text-[16px] font-bold pb-[19px] relative cursor-pointer',
                activeTab === tab ? 'text-black' : 'text-[#666]',
              )}
            >
              {tab}
              {activeTab === tab && (
                <div
                  className={cn(
                    'absolute bottom-0 left-0 right-0 h-[5px] bg-[#333333]',
                  )}
                />
              )}
            </button>
          ))}
        </div>

        {activeTab === '공연후기' && <ConcertReviews />}
      </div>

      <PriceModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        sessions={concertDetail?.sessions || []}
      />
    </div>
  );
};

export default DetailPage;
