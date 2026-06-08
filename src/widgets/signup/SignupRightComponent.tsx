import FormField from '@/shared/ui/FormField'
import SubmitButton from '@/shared/ui/SubmitButton'

export default function SignupRightComponent() {
  return (
    <div className="w-full lg:w-1/2 h-screen bg-[#fff] px-[20px] sm:px-[45px] py-[40px] box-border overflow-y-auto">
      <p className="text-[#000] font-[800] text-[32px] mb-[10px]">모아티켓 시작하기</p>
      <p className="text-[#000] font-[400] mb-[30px]">멋있는 공연을 예매하려면 시작하세요.</p>

      <form className="w-full max-w-[460px] flex flex-col">
        <FormField label="이름" placeholder="홍길동" />
        <FormField label="이메일" type="email" placeholder="onyu.kim@example.com" />
        <FormField label="비밀번호" type="password" placeholder="••••••••" />
        <FormField label="휴대폰 번호" type="tel" placeholder="••••••••" />

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
        <SubmitButton>가입하고 시작하기</SubmitButton>

        {/* Login Link */}
        <div className="flex gap-[10px] justify-center text-[14px] text-[#5c5955]">
          <span>또는</span>
        </div>
      </form>
    </div>
  )
}
