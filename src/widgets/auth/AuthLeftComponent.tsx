import LogoLink from '@/shared/ui/LogoLink'

interface AuthLeftComponentProps {
  showStats?: boolean
}

export default function AuthLeftComponent({ showStats = true }: AuthLeftComponentProps) {
  return (
    <div className="w-1/2 lg:flex lg:flex-col lg:justify-between hidden h-screen bg-radial-[at_100%_0%] from-[#311917] to-[#000] box-border px-[45px] py-[40px] flex flex-col justify-between">
      <LogoLink logoSize={30} containerClassName="flex items-center gap-[16px]" />
      <div id="authInfo">
        <p className="text-[#fff] font-[800] text-[48px] leading-[1.1] mb-[20px]">
          무대의 첫 줄 <br />
          가장 가까운 자리에서
        </p>
        <p className="text-[#fff] font-[300] text-[22px] mb-[50px]">
          콘서트, 뮤지컬, 연극, 클래식, 스포츠까지. <br />
          지금 MOA TICKET에서 예매하세요.
        </p>

        {showStats && (
          <div id="results" className="text-[#fff] flex">
            <dl className="flex flex-col-reverse pr-[16px] flex-1">
              <dd className="font-[300] text-[18px]">누적 예매</dd>
              <dt className="font-[800] text-[30px]">1,200만+</dt>
            </dl>
            <dl className="flex flex-col-reverse pr-[16px] flex-1">
              <dd className="font-[300] text-[18px]">공연/이벤트</dd>
              <dt className="font-[800] text-[30px]">8,400+</dt>
            </dl>
            <dl className="flex flex-col-reverse pr-[16px] flex-1">
              <dd className="font-[300] text-[18px]">앱 평점</dd>
              <dt className="font-[800] text-[30px]">4.9</dt>
            </dl>
          </div>
        )}
      </div>
      <p className="text-[#fff] text-[14px]">2026 MOA TICKET. 본 화면은 예시 화면입니다.</p>
    </div>
  )
}
