import LogoLink from '@/shared/ui/LogoLink'

export default function SignupLeftComponent() {
  return (
    <div className="w-1/2 h-screen bg-radial-[at_100%_0%] from-[#311917] to-[#000] box-border px-[45px] py-[40px] flex-col justify-between flex">
      <LogoLink logoSize={30} containerClassName="flex items-center gap-[16px]" />
      <div>
        <p className="text-[#fff] font-[800] text-[48px] leading-[1.1] mb-[20px]">
          무대의 첫 줄 <br />
          가장 가까운 자리에서.
        </p>
        <p className="text-[#fff] font-[300] text-[22px] mb-[50px]">
          콘서트, 뮤지컬, 연극, 클래식, 스포츠까지. <br />
          지금 MOA TICKET에서 예매하세요.
        </p>
      </div>
    </div>
  )
}
