export default function SignupRightComponent() {
  return (
    <div className="w-full lg:w-1/2 h-screen bg-[#fff] px-[20px] sm:px-[45px] py-[40px] box-border overflow-y-auto">
      <p className="text-[#000] font-[800] text-[32px] mb-[10px]">ONSTAGE 시작하기</p>
      <p className="text-[#000] font-[400] mb-[30px]">멋 있는 공연을 예매하려면 시작하세요.</p>

      <form className="w-full max-w-[460px] flex flex-col">
        {/* Name */}
        <div className="mb-[15px]">
          <label className="block text-[14px] font-[700] mb-[8px]">이름</label>
          <input
            type="text"
            placeholder="증길동"
            className="w-full px-[12px] py-[10px] border border-[#ddd] rounded-[8px] focus:outline-none focus:border-[#ed4543]"
          />
        </div>

        {/* Email */}
        <div className="mb-[15px]">
          <label className="block text-[14px] font-[700] mb-[8px]">이메일</label>
          <input
            type="email"
            placeholder="onyu.kim@example.com"
            className="w-full px-[12px] py-[10px] border border-[#ddd] rounded-[8px] focus:outline-none focus:border-[#ed4543]"
          />
        </div>

        {/* Password */}
        <div className="mb-[15px]">
          <label className="block text-[14px] font-[700] mb-[8px]">비밀번호</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-[12px] py-[10px] border border-[#ddd] rounded-[8px] focus:outline-none focus:border-[#ed4543]"
          />
        </div>

        {/* Phone */}
        <div className="mb-[15px]">
          <label className="block text-[14px] font-[700] mb-[8px]">휴대폰 번호</label>
          <input
            type="tel"
            placeholder="••••••••"
            className="w-full px-[12px] py-[10px] border border-[#ddd] rounded-[8px] focus:outline-none focus:border-[#ed4543]"
          />
        </div>

        {/* Terms */}
        <div className="pt-[10px] mb-[20px]">
          <div className="flex items-center gap-[8px] mb-[10px]">
            <input type="checkbox" id="terms" className="w-4 h-4 accent-[#ed4543]" />
            <label htmlFor="terms" className="text-[14px] text-[#5c5955]">
              만 14세 이상이며, 이용약관 및{' '}
              <span className="text-[#ed4543]">개인정보 처리정책</span>에 동의합니다.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-[12px] bg-[#ed4543] rounded-[10px] text-[#fff] font-[700] mb-[20px] hover:bg-[#d63a35] transition"
        >
          가입하고 시작하기
        </button>

        {/* Login Link */}
        <div className="flex gap-[10px] justify-center text-[14px] text-[#5c5955]">
          <span>또는</span>
        </div>
      </form>
    </div>
  )
}
