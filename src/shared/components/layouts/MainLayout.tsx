import { cn } from '@/shared';
import TopHeader from '../header/TopHeader';
import BottomHeader from '../header/BottomHeader';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className={cn('main__layout')}>
      <TopHeader />
      <BottomHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
