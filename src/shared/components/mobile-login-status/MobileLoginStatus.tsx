import { useState } from 'react';
import { cn } from '@/shared';
import MobileMyInfoBox from './MobileMyInfoBox';
import { useMember } from '@/features/member/useMember';
import { useNavigate } from 'react-router-dom';

const MobileLoginStatus = ({
  isLoggedIn,
  nickname,
}: {
  isLoggedIn: boolean;
  nickname: string;
}) => {
  const navigate = useNavigate();
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const { logoutMember } = useMember();

  const onLogout = () => {
    logoutMember.mutate();
  };

  const goLogin = () => {
    navigate('/login');
  };

  return (
    <div
      className={cn(
        'mobile__login__status',
        'sm:hidden flex items-center gap-[14px]',
        'relative',
      )}
    >
      {isLoggedIn ? (
        <>
          <button
            style={{
              fontFamily: 'ONE_MOBILE_LIGHT',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={onLogout}
          >
            로그아웃
          </button>
          <button
            style={{
              fontFamily: 'ONE_MOBILE_LIGHT',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => setInfoOpen(true)}
          >
            내 정보 보기
          </button>
          {infoOpen && (
            <MobileMyInfoBox
              nickname={nickname}
              onClose={() => setInfoOpen(false)}
            />
          )}
        </>
      ) : (
        <button
          style={{
            fontFamily: 'ONE_MOBILE_LIGHT',
            fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={goLogin}
        >
          로그인
        </button>
      )}
      <button
        style={{
          fontFamily: 'ONE_MOBILE_LIGHT',
          fontSize: '14px',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        1:1 문의
      </button>
    </div>
  );
};

export default MobileLoginStatus;
