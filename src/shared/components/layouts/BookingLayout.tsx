import { Outlet } from 'react-router-dom';
import BookingHeader from '../header/BookingHeader';
import AlarmContainer from '@/widgets/alarm-container/AlarmContainer';

const BookingLayout = () => {
  return (
    <>
      <BookingHeader />
      <Outlet />
      <AlarmContainer />
    </>
  );
};

export default BookingLayout;
