import { cn } from '@/shared';
import IconButton from '../icon-button/IconButton';
import Icon from '@/shared/lib/Icon';
import { useNavigate } from 'react-router-dom';
import { useLoginData } from '@/entities/stores/useLoginData';
import { useLoginDataFunction } from '@/features/login/useLoginDataFunction';
import { useEffect } from 'react';
import ConfirmModal from '../confirm-modal/ConfirmModal';
import { useModalStore } from '@/entities/stores/useModalStore';
import { checkAuthCookie, clearAuthCookies } from '@/shared/lib/cookieUtils';

const BottomHeader = () => {
  const { isLoggedIn, userData, setIsLoggedIn, setUserData } = useLoginData();
  const navigate = useNavigate();
  const { isOpen, title, message, openModal, closeModal } = useModalStore();

  const goLogin = () => {
    navigate('/login');
  };

  const handleModalClose = () => {
    closeModal();
  };

  const handleLogout = () => {
    // 쿠키 제거
    clearAuthCookies();

    // 상태 업데이트
    setIsLoggedIn(false);
    setUserData({ email: '', nickname: '', seller: false });

    // localStorage에서 로그인 정보 제거
    localStorage.removeItem('login-storage');

    // 메인 페이지로 리다이렉트
    navigate('/');
  };

  const goInquiry = () => {
    if (!isLoggedIn) {
      openModal('알림', '로그인 후 이용해주세요');
      return;
    }
    navigate(userData.seller ? '/mypage/selectInquiry' : '/mypage/inquiry');
  };

  const goMyReservation = () => {
    if (!isLoggedIn) {
      openModal('알림', '로그인 후 이용해주세요');
      return;
    }
    navigate('/mypage/reservation');
  };

  const { getLoginData } = useLoginDataFunction();

  // 쿠키 확인하여 로그인 상태 판단
  useEffect(() => {
    const hasAuthCookie = checkAuthCookie();
    if (hasAuthCookie && !isLoggedIn) {
      setIsLoggedIn(true);
      getLoginData.mutate();
    } else if (!hasAuthCookie && isLoggedIn) {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getLoginData.mutate();
    }
  }, [isLoggedIn]);

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={handleModalClose}
        title={title}
        message={message}
      />
      <div
        className={cn('bottom__header__wrapper w-full h-[60px] bg-[#fbfbfb]')}
      >
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
              onNavigate={handleLogout}
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
            iconComponent={
              <Icon ICON="TICKET" className={'w-5 h-5 fill-none'} />
            }
            text={'내 예약'}
            onNavigate={goMyReservation}
          />
          <IconButton
            iconComponent={<Icon ICON="QUESTION" className={'w-6 h-6'} />}
            text={'1:1 문의'}
            onNavigate={goInquiry}
          />
        </div>
      </div>
    </>
  );
};

export default BottomHeader;
