import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/shared';
import Cookies from 'js-cookie';
import IconButton from '../icon-button/IconButton';
import Icon from '@/shared/lib/Icon';
import { useNavigate } from 'react-router-dom';

import { LOGIN, type LoginState } from '@/entities/reducers/LoginReducer';
import { useMember } from '@/features/member/useMember';

const BottomHeader = React.memo(() => {
  const { isLoggedIn } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );
  const { getMember, logoutMember } = useMember();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) return;

    const cookie = Cookies.get('Authorization');
    if (cookie) {
      dispatch({ type: LOGIN, payload: { isLoggedIn: true } });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      getMember.mutate();
    }
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
        <IconButton
          iconComponent={<Icon ICON="QUESTION" className={'w-6 h-6'} />}
          text={'1:1 문의'}
        />
      </div>
    </div>
  );
});

export default BottomHeader;
