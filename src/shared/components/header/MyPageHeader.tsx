import { useSelector } from 'react-redux';
import { cn } from '@/shared';
import type { MainReservation } from '@/entities/reducers/ReservationReducer';
import ProductInfo from '../product-info/ProductInfo';
import Icon from '@/shared/lib/Icon';

const MyPageHeader = () => {
  const { data: reservationData } = useSelector(
    (state: { reservationReducer: MainReservation }) => state.reservationReducer,
  );

  const totalTicketCount = reservationData.items.reduce(
    (acc, item) => acc + item.ticketCount,
    0,
  );

  return (
    <header id="myPageHeader" className={cn('w-full h-[120px] flex')}>
      <div
        className={cn(
          'my__page__header__title w-[250px] h-full bg-black text-white text-[26px] font-bold flex justify-center items-center',
        )}
      >
        마이페이지
      </div>
      <div
        className={cn(
          'my__page__header__products flex-1 h-full border-b border-t border-r border-solid border-black flex justify-center items-center',
        )}
      >
        <ProductInfo
          iconComponent={<Icon ICON="CART" className="w-[40px] h-[40px]" />}
          title="나의 상품"
          value={0}
          isLine
        />
        <ProductInfo
          iconComponent={
            <Icon ICON="TICKET" className="w-[40px] h-[40px] fill-none" />
          }
          title="나의 예매쿠폰"
          value={totalTicketCount}
        />
      </div>
    </header>
  );
};

export default MyPageHeader;
