import { cn } from '@/shared';
import { Link, useLocation } from 'react-router-dom';
import Skeleton from '../skeleton/Skeleton';
import Icon from '@/shared/lib/Icon';

const BookingHeader = () => {
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
    }
  };

  return (
    <div
      className={cn(
        'booking__header h-[90px] border-b border-solid border-[rgb(237,237,237)]',
      )}
    >
      <div
        className={cn(
          'booking__header__inner',
          'max-w-[1080px] mx-auto h-full flex justify-between items-center',
        )}
      >
        <Link to="/" onClick={handleLogoClick}>
          <img className="w-[89px] h-[25px]" src="/logo.svg" alt="logo" />
        </Link>
        <Link to="/mypage/reservation">
          <Icon ICON={'MY_PAGE'} className="w-[82px] h-[24px]" />
        </Link>
      </div>
    </div>
  );
};

export default BookingHeader;
