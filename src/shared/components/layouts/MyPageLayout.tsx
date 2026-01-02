import { cn } from '@/shared';
import MyPageHeader from '../header/MyPageHeader';
import MyPageAside from '../header/MyPageAside';
import { Outlet } from 'react-router-dom';

const MyPageLayout = () => {
  return (
    <div className={cn('my__page__layout w-full')}>
      <div className={cn('my__page__layout__inner max-w-[1080px] mx-auto')}>
        <MyPageHeader />
        <div className={cn('my__page__content flex')}>
          <MyPageAside />
          <div className={cn('my__page__main flex-1')}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;
