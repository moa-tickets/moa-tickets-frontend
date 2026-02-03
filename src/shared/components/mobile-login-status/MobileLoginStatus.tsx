import { cn } from '@/shared';

const MobileLoginStatus = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div
      className={cn(
        'mobile__login__status',
        'sm:hidden flex items-center gap-[14px]',
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
          >
            내 정보 보기
          </button>
        </>
      ) : (
        <button
          style={{
            fontFamily: 'ONE_MOBILE_LIGHT',
            fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
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
