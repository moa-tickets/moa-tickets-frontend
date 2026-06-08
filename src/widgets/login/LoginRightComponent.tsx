'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import FormField from '@/shared/ui/FormField'
import SubmitButton from '@/shared/ui/SubmitButton'
import SocialLoginButton from '@/shared/ui/SocialLoginButton'
import LogoLink from '@/shared/ui/LogoLink'
import TermsCheckbox from '@/shared/ui/TermsCheckbox'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'

export default function LoginRightComponent() {
  const router = useRouter()
  const [isIdMemory, setIsIdMemory] = useState<boolean>(false)

  return (
    <div className="lg:block flex flex-col justify-center lg:w-1/2 xsm:w-[50%] w-[80%] w- h-screen mx-auto bg-[#fff] lg:px-[45px] lg:py-[40px] p-0 box-border overflow-y-auto">
      <LogoLink
        logoSize={30}
        containerClassName="lg:hidden flex items-center gap-[16px] sm:mb-[40px] mb-[20px]"
        textClassName="text-[#000] font-[800] text-[24px]"
      />
      <p className="text-[#000] font-[800] text-[24px] sm:text-[32px] mb-[10px]">
        다시 오신 걸 환영해요
      </p>
      <p className="text-[#000] font-[400] sm:text-[16px] text-[14px] mb-[20px]">
        로그인하고 예매를 이어가세요.
      </p>
      <form className="w-full max-w-[460px] flex flex-col">
        <FormField label="이메일" type="email" placeholder="onyu.kim@example.com" />
        <FormField label="비밀번호" type="password" placeholder="••••••••" />
        <div id="login__footer" className="flex justify-between mb-[20px]">
          <TermsCheckbox label={'아이디 저장'} checked={isIdMemory} onChange={setIsIdMemory} />
          <div id="find__password">
            <button type="button" className="bg-transparent text-[14px]">
              비밀번호 찾기
            </button>
          </div>
        </div>
        <SubmitButton>로그인</SubmitButton>
        <div id="divider" className="text-[14px] self-center mb-[20px]">
          또는
        </div>
        <SocialLoginButton icon={<RiKakaoTalkFill size={22} />} label="카카오톡으로 로그인" />
        <SocialLoginButton icon={<SiNaver size={16} />} label="네이버로 로그인" />
        <div
          id="join"
          className="flex gap-[10px] justify-center text-[14px] text-[#5c5955] mt-[20px]"
        >
          <span>아직 회원이 아니신가요?</span>
          <button
            type="button"
            className="bg-transparent text-[14px] text-[#ED4543] cursor-pointer"
            onClick={() => router.push('/signup')}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  )
}
