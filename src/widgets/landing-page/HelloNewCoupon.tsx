import { cn } from '@/shared';

const HelloNewCoupon = () => {
  return (
    <div
      className={cn(
        'hello__new__coupon w-full py-[30px] pb-[120px] bg-[#B0FF41]',
      )}
    >
      <img
        src={'/main_banner/main_slide_1_detail_3.png'}
        alt="Hello New Coupon Title"
        className="mx-auto max-w-[50%]"
      />
      <div className="coupon__part flex justify-center gap-10 mt-[60px]">
        <div className="coupon__1">
          <div
            className={cn(
              'coupon__img w-[300px] h-[180px] bg-[#4154FF] overflow-hidden rounded-[10px] relative',
              "before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:rounded-full before:bg-[#b0ff41] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2 z-[100]",
              "after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:rounded-full after:bg-[#b0ff41] after:top-1/2 after:right-0 after:-translate-y-1/2 after:translate-x-1/2 z-[100]",
            )}
          >
            <div className="coupon__edge absolute top-0 bottom-0 right-0 w-[50px] bg-[#FDFFC7] flex justify-center items-center">
              <span
                className={cn(
                  'block rotate-270 origin-center font-bold text-[#4154ff]',
                )}
              >
                COUPON
              </span>
            </div>
            <div
              className={cn(
                'coupon__price absolute left-[80px] top-1/2 -translate-y-1/2 font-bold text-white text-[25px] ',
              )}
            >
              4,000원
            </div>
            <div
              className={cn(
                'coupon__info absolute top-[10px] left-[50px] text-white text-[14px] font-light',
              )}
            >
              이달의신작_연극_뮤지컬 전용
            </div>
          </div>
          <button
            className={cn(
              'mt-[10px] py-[16px] bg-white w-full text-[20px] text-[#4154ff] font-bold rounded-[15px] border-2 border-solid border-[#4154ff] cursor-pointer',
            )}
          >
            쿠폰 다운받기
          </button>
        </div>
        <div className="coupon__2">
          <div
            className={cn(
              'coupon__img w-[300px] h-[180px] bg-[#4154FF] overflow-hidden rounded-[10px] relative',
              "before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:rounded-full before:bg-[#b0ff41] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2 z-[100]",
              "after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:rounded-full after:bg-[#b0ff41] after:top-1/2 after:right-0 after:-translate-y-1/2 after:translate-x-1/2 z-[100]",
            )}
          >
            <div className="coupon__edge absolute top-0 bottom-0 right-0 w-[50px] bg-[#FDFFC7] flex justify-center items-center">
              <span
                className={cn(
                  'block rotate-270 origin-center font-bold text-[#4154ff]',
                )}
              >
                COUPON
              </span>
            </div>
            <div
              className={cn(
                'coupon__price absolute left-[80px] top-1/2 -translate-y-1/2 font-bold text-white text-[25px] ',
              )}
            >
              4,000원
            </div>
            <div
              className={cn(
                'coupon__info absolute top-[10px] left-[50px] text-white text-[14px] font-light',
              )}
            >
              이달의신작_연극_뮤지컬 전용
            </div>
          </div>
          <button
            className={cn(
              'mt-[10px] py-[16px] bg-white w-full text-[20px] text-[#4154ff] font-bold rounded-[15px] border-2 border-solid border-[#4154ff] cursor-pointer',
            )}
          >
            쿠폰 다운받기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelloNewCoupon;
