import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@/shared';
import IconButton from '../icon-button/IconButton';
import Icon from '@/shared/lib/Icon';
import { useNavigate } from 'react-router-dom';

import type { LoginState } from '@/entities/reducers/LoginReducer';
import { useMember } from '@/features/member/useMember';

const BottomHeader = React.memo(() => {
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );
  const { getMember, logoutMember } = useMember();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      getMember.mutate();
    }
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const goLogin = () => {
    navigate('/login');
  };

  const goMyReservation = () => {
    navigate('/mypage/reservation');
  };

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
            onNavigate={() => logoutMember.mutate()}
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
          onNavigate={goMyReservation}
        />
      </div>
    </div>
  );
});

export default BottomHeader;
