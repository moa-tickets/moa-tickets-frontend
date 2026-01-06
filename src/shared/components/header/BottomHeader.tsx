import { cn } from '@/shared';
import IconButton from '../icon-button/IconButton';
import Icon from '@/shared/lib/Icon';
import { useNavigate } from 'react-router-dom';
import { useLoginData } from '@/entities/stores/useLoginData';

const BottomHeader = () => {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/login');
  };
  const goInquiry = () => {
    navigate('/mypage/inquiry');
  };

  const { isLoggedIn } = useLoginData();

  return (
    <div className={cn('bottom__header__wrapper w-full h-[60px] bg-[#fbfbfb]')}>
      <div
        className={cn(
          'bottom__header max-w-[1080px] h-full mx-auto flex gap-3 items-center',
        )}
      >
        {isLoggedIn ? (
          <IconButton
            iconComponent={
              <Icon ICON="PROFILE" className={'w-5 h-5 fill-none'} />
            }
            text={'로그아웃'}
          />
        ) : (
          <IconButton
            iconComponent={
              <Icon ICON="PROFILE" className={'w-5 h-5 fill-none'} />
            }
            text={'로그인'}
            onNavigate={goLogin}
          />
        )}
        <IconButton
          iconComponent={<Icon ICON="TICKET" className={'w-5 h-5 fill-none'} />}
          text={'내 예약'}
        />
        <IconButton
          iconComponent={<Icon ICON="QUESTION" className={'w-6 h-6'} />}
          text={'1:1 문의'}
          onNavigate={goInquiry}
        />
      </div>
    </div>
  );
};

export default BottomHeader;
