import FormField from '@/shared/ui/FormField'
import SubmitButton from '@/shared/ui/SubmitButton'
import TermsCheckbox from '@/shared/ui/TermsCheckbox'

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
        <TermsCheckbox />

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
