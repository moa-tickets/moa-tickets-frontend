import { useState } from 'react';
import { detailData } from '@/entities/constant/detailData';
import { reviewData } from '@/entities/constant/reviewData';
import { cn } from '@/shared';
import DetailDescription from '@/widgets/detail-description/DetailDescription';
import { useParams } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import Icon from '@/shared/lib/Icon';
import PriceModal from '@/shared/components/price-modal/PriceModal';
import NaverMapModal from '@/shared/components/naver-map-modal/NaverMapModal';
import OptimizedImage from '@/shared/components/optimized-image/OptimizedImage';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('공연정보');
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const detailPageData = detailData[Number(id)];
  const reviewPageData = reviewData[Number(id)];

  if (!detailPageData || detailPageData.isLandingPage) {
    return null;
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  return (
    <div className={cn('detail__page__all bg-white min-h-screen')}>
      <div
        className={cn('detail__page__wrapper max-w-[1280px] mx-auto px-[40px]')}
      >
        {/* Badges */}
        <div className={cn('flex gap-2 mt-[21px] mb-[20px]')}>
          {detailPageData.badges?.exclusive && (
            <div
              className={cn(
                'px-[6px] py-[4px] rounded-[6px] bg-[#F0F1FF] text-[#4154FF] text-[11px] font-bold flex items-center gap-1',
              )}
            >
              <span>단독판매</span>
              <Icon
                ICON="CLOSE_SMALL"
                className="w-[14px] h-[14px] text-[#4154FF]"
              />
            </div>
          )}
          {detailPageData.badges?.safeBooking && (
            <div
              className={cn(
                'px-[6px] py-[4px] rounded-[6px] bg-[#F4F4F5] text-[#7E7E81] text-[11px] font-bold flex items-center gap-1',
              )}
            >
              <span>안심예매</span>
              <Icon
                ICON="CLOSE_SMALL"
                className="w-[14px] h-[14px] text-[rgba(41,41,45,0.5)]"
              />
            </div>
          )}
          {detailPageData.badges?.waiting && (
            <div
              className={cn(
                'px-[6px] py-[4px] rounded-[6px] bg-[#F4F4F5] text-[#7E7E81] text-[11px] font-bold flex items-center gap-1',
              )}
            >
              <span>예매대기</span>
              <Icon
                ICON="CLOSE_SMALL"
                className="w-[14px] h-[14px] text-[rgba(41,41,45,0.5)]"
              />
            </div>
          )}
        </div>

        {/* Title and Genre */}
        <h1
          className={cn(
            'text-[26px] font-bold text-[#222222] leading-[39px] mb-[12px]',
          )}
        >
          {detailPageData.concertTitle}
        </h1>
        <div className={cn('genre text-[14px] text-[#666] mb-[28px]')}>
          {detailPageData.genre}
        </div>

        {/* Main Content Section */}
        <div className={cn('flex gap-[48px] mb-[20px]')}>
          {/* Left: Image and Info */}
          <div className={cn('flex gap-[48px] flex-1')}>
            {/* Thumbnail Image */}
            <div
              className={cn(
                'info__image w-[300px] h-[400px] border border-solid border-[#DADEE3] rounded-[15px] overflow-hidden flex-shrink-0',
              )}
            >
              <OptimizedImage
                src={detailPageData.thumbnail || ''}
                alt="Detail Info"
                className={cn('w-full h-full')}
                skeletonClassName="rounded-[15px]"
              />
            </div>

            {/* Info Description */}
            <div className={cn('info__description flex-1')}>
              {/* Location */}
              <div className={cn('mb-[15px]')}>
                <DetailDescription
                  dd={'장소'}
                  dt={
                    <div className={cn('flex items-center gap-1')}>
                      <span>{detailPageData.loc}</span>
                      <Icon
                        ICON="ARROW_RIGHT"
                        className="w-[5px] h-[7px] text-[#666]"
                      />
                    </div>
                  }
                />
              </div>

              {/* Date */}
              <div className={cn('mb-[15px]')}>
                <DetailDescription
                  dd={'공연기간'}
                  dt={detailPageData.date || ''}
                />
              </div>

              {/* Age */}
              <div className={cn('mb-[15px]')}>
                <DetailDescription
                  dd={'관람연령'}
                  dt={detailPageData.age || '8세이상 관람가능'}
                />
              </div>

              {/* Price */}
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
                          className="w-[5px] h-[7px] text-[#666]"
                        />
                      </button>
                      <div className={cn('flex items-center gap-[7px]')}>
                        <span className={cn('text-[14px] text-[#666]')}>
                          전석
                        </span>
                        <span
                          className={cn('text-[14px] font-bold text-black')}
                        >
                          {formatPrice(detailPageData.price?.all || 0)}원
                        </span>
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Benefits */}
              {detailPageData.benefits &&
                detailPageData.benefits.length > 0 && (
                  <div className={cn('mb-[15px]')}>
                    <DetailDescription
                      dd={'혜택'}
                      dt={
                        <div className={cn('flex items-center gap-1')}>
                          {detailPageData.benefits.map((benefit) => (
                            <div
                              key={benefit}
                              className={cn(
                                'py-[3px] bg-white text-black text-[16px] font-normal',
                              )}
                            >
                              {benefit}
                            </div>
                          ))}
                          <Icon
                            ICON="ARROW_RIGHT"
                            className="w-[5px] h-[7px] text-[#666]"
                          />
                        </div>
                      }
                    />
                  </div>
                )}

              {/* Delivery */}
              {detailPageData.delivery && (
                <div className={cn('mb-[15px]')}>
                  <DetailDescription
                    dd={'배송'}
                    dt={
                      <div className={cn('flex flex-col gap-[6px]')}>
                        <p
                          className={cn(
                            'text-[14px] leading-[30px] text-black',
                          )}
                        >
                          {detailPageData.delivery.date}
                        </p>
                        {detailPageData.delivery.details && (
                          <p
                            className={cn(
                              'text-[13.6px] leading-[30px] text-[#666] mb-[15px]',
                            )}
                          >
                            {detailPageData.delivery.details}
                          </p>
                        )}
                        {detailPageData.delivery.addressLink && (
                          <button
                            type="button"
                            onClick={() => setIsMapModalOpen(true)}
                            className={cn(
                              'cursor-pointer flex items-center gap-1 text-[14px] text-[#666] w-fit hover:underline',
                            )}
                          >
                            <span>{detailPageData.delivery.addressLink}</span>
                            <Icon
                              ICON="ARROW_RIGHT_SMALL"
                              className="w-[4px] h-[7px] text-[#666]"
                            />
                          </button>
                        )}
                      </div>
                    }
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right: Ticket Opening Info and Reservation Button */}
          <div className={cn('w-[340px] flex-shrink-0')}>
            {/* Ticket Opening Info Box */}
            {detailPageData.ticketOpening && (
              <div
                className={cn(
                  'border border-[#B6BDC7] rounded-[15px] p-[20px] mb-[20px]',
                )}
              >
                <h3
                  className={cn(
                    'text-[14px] font-bold text-center mb-[35px] text-black',
                  )}
                >
                  티켓오픈안내
                </h3>

                {/* Membership Pre-sale */}
                {detailPageData.ticketOpening.membership && (
                  <div className={cn('mb-[20px]')}>
                    <div className={cn('flex items-start gap-[15px]')}>
                      <div
                        className={cn(
                          'text-[26px] font-normal text-[#EF3E43] leading-[30px]',
                        )}
                      >
                        {detailPageData.ticketOpening.membership.daysLeft}
                      </div>
                      <div className={cn('flex-1')}>
                        <div
                          className={cn(
                            'text-[16px] font-normal text-black mb-[5px]',
                          )}
                        >
                          {detailPageData.ticketOpening.membership.label}
                        </div>
                        <div
                          className={cn(
                            'text-[14px] font-normal text-[#666] leading-[18px]',
                          )}
                        >
                          {detailPageData.ticketOpening.membership.date}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* General Ticket Opening */}
                {detailPageData.ticketOpening.general && (
                  <div className={cn('mb-[20px]')}>
                    <div className={cn('flex items-start gap-[15px]')}>
                      <div
                        className={cn(
                          'text-[26px] font-normal text-[#EF3E43] leading-[30px]',
                        )}
                      >
                        {detailPageData.ticketOpening.general.daysLeft}
                      </div>
                      <div className={cn('flex-1')}>
                        <div
                          className={cn(
                            'text-[16px] font-normal text-black mb-[5px]',
                          )}
                        >
                          {detailPageData.ticketOpening.general.label}
                        </div>
                        <div
                          className={cn(
                            'text-[14px] font-normal text-[#666] leading-[18px]',
                          )}
                        >
                          {detailPageData.ticketOpening.general.date}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notice */}
                {detailPageData.ticketOpening.notice && (
                  <p
                    className={cn(
                      'text-[12px] font-normal text-[#666] text-center leading-[14px]',
                    )}
                  >
                    {detailPageData.ticketOpening.notice}
                  </p>
                )}
              </div>
            )}

            {/* Reservation Button */}
            <Button
              className={cn(
                'w-full h-[54px] bg-[#4154FF] text-white text-[18px] font-bold rounded-[10px] border border-[#4154FF] hover:bg-[#4154FF]/90 cursor-pointer',
              )}
            >
              예매하기
            </Button>
          </div>
        </div>

        {/* Ticketcast and Like Count */}
        <div className={cn('flex items-center gap-[88px] mb-[20px]')}>
          {detailPageData.ticketcast && (
            <div className={cn('flex items-center gap-[3px]')}>
              <div
                className={cn('w-[23px] h-[15px] bg-contain bg-no-repeat')}
                style={{
                  backgroundImage: 'url(/icon/ticket.svg)',
                }}
              />
              <span className={cn('text-[14px] text-black')}>티켓캐스트</span>
            </div>
          )}
          {detailPageData.likeCount !== undefined && (
            <div className={cn('text-[14px] font-bold text-black')}>
              {detailPageData.likeCount}
            </div>
          )}
          <div className={cn('flex gap-[9px]')}>
            <div
              className={cn('w-[27px] h-[27px] rounded-[13.5px] bg-[#999999]')}
            />
            <div
              className={cn('w-[27px] h-[27px] rounded-[13.5px] bg-[#999999]')}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className={cn('border-b border-[#B6BDC7] flex gap-[28px] mb-[20px]')}
        >
          {['공연정보', '판매정보', '공연후기'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'text-[16px] font-bold pb-[19px] relative',
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

        {/* Tab Content */}
        {activeTab === '공연정보' && detailPageData.detailPageDesign && (
          <div className={cn('w-[70%] mb-[20px]')}>
            <OptimizedImage
              src={detailPageData.detailPageDesign}
              alt="Detail Page Design"
              className={cn('w-full h-auto')}
            />
          </div>
        )}

        {activeTab === '판매정보' && (
          <div className={cn('mb-[20px]')}>
            <p className={cn('text-[16px] text-[#666]')}>판매정보 내용</p>
          </div>
        )}

        {activeTab === '공연후기' && reviewPageData && (
          <div className={cn('mb-[20px]')}>
            {/* Rating Header */}
            <div className={cn('flex items-center gap-[32px] mb-[40px]')}>
              <h2 className={cn('text-[20px] font-bold text-black')}>
                관람평점
              </h2>
              <span className={cn('text-[26px] font-black text-black')}>
                {reviewPageData.averageRating}
              </span>
            </div>

            {/* Review Cards */}
            <div className={cn('flex flex-col gap-[16px] mb-[40px]')}>
              {reviewPageData.reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={cn(
                    'border border-[#E8E8E8] rounded-[7px] p-[17px]',
                    index === 3 ? 'bg-black text-white' : 'bg-white',
                  )}
                >
                  <div
                    className={cn('flex items-start justify-between mb-[16px]')}
                  >
                    <div className={cn('flex items-center gap-[8px]')}>
                      <span
                        className={cn(
                          'text-[20px] font-bold',
                          index === 3 ? 'text-white' : 'text-black',
                        )}
                      >
                        평점
                      </span>
                      <span
                        className={cn(
                          'text-[20px] font-bold',
                          index === 3 ? 'text-white' : 'text-black',
                        )}
                      >
                        {review.rating}
                      </span>
                    </div>
                    <div
                      className={cn(
                        'flex items-center gap-[16px] text-[16px] font-bold',
                        index === 3 ? 'text-white' : 'text-black',
                      )}
                    >
                      <span>{review.username}</span>
                      {review.isBooker && (
                        <span
                          className={cn(
                            'px-[8px] py-[2px] rounded text-[14px]',
                            index === 3
                              ? 'bg-[#3B00FF] text-white'
                              : 'bg-transparent text-[#3B00FF]',
                          )}
                        >
                          예매자
                        </span>
                      )}
                      <span>
                        조회수 {review.viewCount.toLocaleString('ko-KR')}회
                      </span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <h3
                    className={cn(
                      'text-[18px] font-bold mb-[16px]',
                      index === 3 ? 'text-white' : 'text-black',
                    )}
                  >
                    {review.title}
                  </h3>
                  <p
                    className={cn(
                      'text-[18px] font-medium leading-[25px]',
                      index === 3 ? 'text-white' : 'text-[#828080]',
                    )}
                  >
                    {review.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div
              className={cn(
                'flex items-center justify-center gap-[8px] mb-[40px]',
              )}
            >
              <button
                className={cn(
                  'w-[34px] h-[34px] border border-[#B9BFC9] rounded flex items-center justify-center',
                )}
              >
                <Icon
                  ICON="ARROW_LEFT_PAGINATION"
                  className="w-[6px] h-[11px] text-[#111111] rotate-180"
                />
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'w-[34px] h-[34px] border rounded flex items-center justify-center text-[14px]',
                    currentPage === page
                      ? 'bg-[#333333] border-[#333333] text-white'
                      : 'border-[#B6BDC7] text-black',
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                className={cn(
                  'w-[34px] h-[34px] border border-[#B9BFC9] rounded flex items-center justify-center',
                )}
              >
                <Icon
                  ICON="ARROW_RIGHT_PAGINATION"
                  className="w-[6px] h-[11px] text-[#111111]"
                />
              </button>
            </div>

            {/* AI Review Analysis */}
            {reviewPageData.analysis && (
              <div
                className={cn(
                  'border border-[#E8E8E8] rounded-[7px] p-[18px] bg-white',
                )}
              >
                <h3
                  className={cn('text-[20px] font-bold text-black mb-[24px]')}
                >
                  AI가 분석한 리뷰
                </h3>
                <div className={cn('flex gap-[20px]')}>
                  {/* Likes Section */}
                  <div className={cn('flex-1')}>
                    <div
                      className={cn('flex items-center gap-[8px] mb-[16px]')}
                    >
                      <div
                        className={cn(
                          'w-[24px] h-[24px] rounded-full bg-[#91E2E2] flex items-center justify-center',
                        )}
                      >
                        <div
                          className={cn(
                            'w-[9px] h-[3.5px] bg-[#1CBABA] rounded',
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          'text-[16px] font-semibold text-[#00A5AA]',
                        )}
                      >
                        좋아요
                      </span>
                    </div>
                    <div className={cn('flex flex-col gap-[8px]')}>
                      {reviewPageData.analysis.likes.map((item) => (
                        <div
                          key={item.keyword}
                          className={cn('flex items-center justify-between')}
                        >
                          <span
                            className={cn(
                              'text-[12px] font-semibold text-black',
                            )}
                          >
                            {item.keyword}
                          </span>
                          <span className={cn('text-[14px] text-[#999]')}>
                            {item.count.toLocaleString('ko-KR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={cn('w-[1px] bg-[#E8E8E8]')} />

                  {/* Dislikes Section */}
                  <div className={cn('flex-1')}>
                    <div
                      className={cn('flex items-center gap-[8px] mb-[16px]')}
                    >
                      <div
                        className={cn(
                          'w-[24px] h-[24px] rounded-full bg-[#DBE4E9] flex items-center justify-center',
                        )}
                      >
                        <div
                          className={cn(
                            'w-[7.6px] h-[2px] bg-[#93A0A8] rounded',
                          )}
                        />
                      </div>
                      <span
                        className={cn('text-[16px] font-semibold text-[#666]')}
                      >
                        아쉬워요
                      </span>
                    </div>
                    <div className={cn('flex flex-col gap-[8px]')}>
                      {reviewPageData.analysis.dislikes.map((item) => (
                        <div
                          key={item.keyword}
                          className={cn('flex items-center justify-between')}
                        >
                          <span
                            className={cn(
                              'text-[12px] font-semibold text-black',
                            )}
                          >
                            {item.keyword}
                          </span>
                          <span className={cn('text-[14px] text-[#999]')}>
                            {item.count.toLocaleString('ko-KR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Price Modal */}
      {detailPageData.price && (
        <PriceModal
          isOpen={isPriceModalOpen}
          onClose={() => setIsPriceModalOpen(false)}
          prices={detailPageData.price}
        />
      )}

      {/* Naver Map Modal */}
      {detailPageData.delivery && detailPageData.loc && (
        <NaverMapModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          address={detailPageData.loc}
        />
      )}
    </div>
  );
};

export default DetailPage;
