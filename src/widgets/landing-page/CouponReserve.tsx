import { cn } from '@/shared';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// @ts-ignore - swiper css type declaration
import 'swiper/css';
// @ts-ignore - swiper pagination css type declaration
import 'swiper/css/pagination';
import SwiperSlideCard from '@/shared/components/slide-card/SwiperSlideCard';
import './CouponReserve.css';

const CouponReserve = () => {
  const couponReserveArray = [
    {
      id: 1,
      imgSrc: '/coupon_reserve/coupon_reserve_1.png',
      genre: '연극',
      title: '그때도 오늘2: 꽃신',
      description: '김혜은/안소희 등이 선보이는 2인극',
      sale: '20%|직장인 할인',
    },
    {
      id: 2,
      imgSrc: '/coupon_reserve/coupon_reserve_1.png',
      genre: '연극',
      title: '그때도 오늘2: 꽃신',
      description: '김혜은/안소희 등이 선보이는 2인극',
      sale: '20%|직장인 할인',
    },
    {
      id: 3,
      imgSrc: '/coupon_reserve/coupon_reserve_1.png',
      genre: '연극',
      title: '그때도 오늘2: 꽃신',
      description: '김혜은/안소희 등이 선보이는 2인극',
      sale: '20%|직장인 할인',
    },
    {
      id: 4,
      imgSrc: '/coupon_reserve/coupon_reserve_1.png',
      genre: '연극',
      title: '그때도 오늘2: 꽃신',
      description: '김혜은/안소희 등이 선보이는 2인극',
      sale: '20%|직장인 할인',
    },
    {
      id: 5,
      imgSrc: '/coupon_reserve/coupon_reserve_1.png',
      genre: '연극',
      title: '그때도 오늘2: 꽃신',
      description: '김혜은/안소희 등이 선보이는 2인극',
      sale: '20%|직장인 할인',
    },
  ];

  return (
    <div className={cn('coupon__reserve py-[30px] bg-black w-full')}>
      <img
        src={'/main_banner/main_slide_1_detail_4.png'}
        alt="Coupon Reserve Title"
        className="mx-auto max-w-[50%]"
      />
      <Swiper
        modules={[Pagination]}
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          type: 'progressbar',
        }}
        className="coupon-swiper"
      >
        {couponReserveArray.map((item) => (
          <SwiperSlide key={item.id}>
            <SwiperSlideCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CouponReserve;
