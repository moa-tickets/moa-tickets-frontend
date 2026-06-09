'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import FormField from '@/shared/ui/FormField'
import SubmitButton from '@/shared/ui/SubmitButton'
import TermsCheckbox from '@/shared/ui/TermsCheckbox'
import AuthToggleLink from '@/shared/ui/AuthToggleLink'
import LogoLink from '@/shared/ui/LogoLink'

const SocialLoginSection = dynamic(() => import('@/shared/ui/SocialLoginSection'), { ssr: true })

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
        <FormField label="비밀번호 확인" type="password" placeholder="••••••••" />

        <div className="mb-[15px]">
          <label className="block text-[14px] font-[700] mb-[8px]">휴대폰 번호</label>
          <div className="flex gap-[10px]">
            <input
              type="tel"
              placeholder="010-0000-0000"
              className="flex-1 px-[12px] py-[10px] border border-[#ddd] rounded-[8px] focus:outline-none focus:border-[#ed4543]"
            />
            <button
              type="button"
              className="px-[16px] py-[10px] bg-[#ed4543] text-[#fff] rounded-[8px] font-[700] text-[14px] hover:bg-[#d63a35] transition whitespace-nowrap"
            >
              인증요청
            </button>
          </div>
        </div>

        <FormField label="인증 코드" type="text" placeholder="000000" />
        <FormField label="닉네임" type="text" placeholder="모아팬" />

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

        <SocialLoginSection />

        <AuthToggleLink text="이미 계정이 있으신가요?" linkText="로그인" href="/auth/login" />
      </form>
    </div>
  )
}
