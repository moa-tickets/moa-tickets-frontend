'use client'

import LoginInput from '@/shared/ui/login/LoginInput'
import { useRouter } from 'next/navigation'
import { IoCheckboxOutline } from 'react-icons/io5'

export default function LoginRightComponent() {
  const router = useRouter()

  return (
    <div className="w-full lg:w-1/2 h-screen bg-[#fff] px-[20px] sm:px-[45px] py-[40px] box-border overflow-y-auto">
      <p className="text-[#000] font-[800] text-[32px] mb-[10px]">다시 오신 걸 환영해요</p>
      <p className="text-[#000] font-[400] mb-[20px]">로그인하고 예매를 이어가세요.</p>
      <form className="w-full max-w-[460px] flex flex-col">
        <LoginInput label="이메일" type="email" placeholder="onyu.kim@example.com" />
        <LoginInput label="비밀번호" type="password" placeholder="••••••••" />
        <div id="login__footer" className="flex justify-between mb-[20px]">
          <div id="login__memory" className="flex items-center gap-[8px]">
            <input type="checkbox" className="hidden" />
            <button type="button" className="bg-transparent cursor-pointer">
              <IoCheckboxOutline color="#ED4543" size={22} />
            </button>
            <label className="text-[14px] text-[#5c5955]">아이디 저장</label>
          </div>
          <div id="find__password">
            <button type="button" className="bg-transparent text-[14px]">
              비밀번호 찾기
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-[10px] bg-[#ed4543] rounded-[10px] text-[#fff] mb-[20px]"
        >
          로그인
        </button>
        <div id="divider" className="text-[14px] self-center mb-[20px]">
          또는
        </div>
        <button
          type="button"
          id="kakao"
          className="w-full bg-transparent border border-black rounded-[10px] py-[10px] mb-[10px] text-[14px] font-[700] cursor-pointer"
        >
          카카오톡으로 로그인
        </button>
        <button
          type="button"
          id="kakao"
          className="w-full bg-transparent border border-black rounded-[10px] py-[10px] mb-[10px] text-[14px] font-[700] cursor-pointer"
        >
          네이버로 로그인
        </button>
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
