import { Outlet } from 'react-router-dom';
import BookingHeader from '../header/BookingHeader';

const BookingLayout = () => {
  return (
    <>
      <BookingHeader />
      <Outlet />
    </>
  );
};

export default BookingLayout;
