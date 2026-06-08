'use client'

import { useState } from 'react'
import FormField from '@/shared/ui/FormField'
import SubmitButton from '@/shared/ui/SubmitButton'
import TermsCheckbox from '@/shared/ui/TermsCheckbox'
import AuthToggleLink from '@/shared/ui/AuthToggleLink'
import SocialLoginButton from '@/shared/ui/SocialLoginButton'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'
import LogoLink from '@/shared/ui/LogoLink'

export default function SignupRightComponent() {
  const [termsChecked, setTermsChecked] = useState(false)

  return (
    <div className="w-full lg:w-1/2 h-screen bg-[#fff] px-[20px] sm:px-[45px] py-[40px] box-border overflow-y-auto">
      <LogoLink
        logoSize={30}
        containerClassName="lg:hidden flex items-center gap-[16px] sm:mb-[40px] mb-[20px]"
        textClassName="text-[#000] font-[800] text-[24px]"
      />
      <p className="text-[#000] font-[800] text-[32px] mb-[10px]">모아티켓 시작하기</p>
      <p className="text-[#000] font-[400] mb-[30px]">멋있는 공연을 예매하려면 시작하세요.</p>

      <form className="w-full max-w-[460px] flex flex-col">
        <FormField label="이름" placeholder="홍길동" />
        <FormField label="이메일" type="email" placeholder="onyu.kim@example.com" />
        <FormField label="비밀번호" type="password" placeholder="••••••••" />
        <FormField label="휴대폰 번호" type="tel" placeholder="••••••••" />

        <TermsCheckbox
          label={
            <>
              만 14세 이상이며, 이용약관 및{' '}
              <span className="text-[#ed4543]">개인정보 처리정책</span>에 동의합니다.
            </>
          }
          checked={termsChecked}
          onChange={setTermsChecked}
        />

        <SubmitButton>가입하고 시작하기</SubmitButton>

        <div className="flex gap-[10px] justify-center text-[14px] text-[#5c5955] mb-[20px]">
          <span>또는</span>
        </div>

        <SocialLoginButton icon={<RiKakaoTalkFill size={22} />} label="카카오톡으로 로그인" />
        <SocialLoginButton icon={<SiNaver size={16} />} label="네이버로 로그인" />

        <AuthToggleLink text="이미 계정이 있으신가요?" linkText="로그인" href="/login" />
      </form>
    </div>
  )
}
