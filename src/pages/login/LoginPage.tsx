const LoginPage = () => {
  const goLogin = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${baseUrl}/login/google`;
  };

  return (
    <div className="login__page__wrapper w-full h-[600px] flex justify-center items-center">
      <div className="login__page w-[900px] h-[500px] border border-solid border-[#dadbdf] rounded-[10px] flex flex-col justify-center items-center gap-[40px]">
        <img src="/logo.svg" alt="moa-tickets-logo" className="w-[122px]" />
        <p className="text-center font-light">
          <b>구글 계정 하나로</b> <br /> 서비스를 모두 이용할 수 있어요.
        </p>
        <button
          className="w-[500px] border border-solid border-[#dadbdf] rounded-[10px] py-[11px] text-[14px] font-bold relative after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:bg-[url('/icon/google.svg')] after:bg-no-repeat after:left-[10px] hover:bg-black hover:text-white transition duration-600 cursor-pointer"
          onClick={goLogin}
        >
          구글로 시작하기
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
