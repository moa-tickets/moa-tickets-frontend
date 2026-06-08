import Link from 'next/link'

export default function SignupLeftComponent() {
  return (
    <div className="hidden lg:flex w-1/2 h-screen bg-radial-[at_100%_0%] from-[#311917] to-[#000] box-border px-[45px] py-[40px] flex-col justify-between">
      <Link href="/" className="flex items-center gap-[16px]">
        <div
          id="logoBox"
          className="w-[30px] h-[30px] bg-[#ed4543] rounded-[10px] flex justify-center items-center"
        >
          <svg
            width="14.520000000000001"
            height="14.520000000000001"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2 1.6 1.6 0 0 0 0 3.2 1.6 1.6 0 0 1 0 3.2 2 2 0 0 1-2 2H7a2 2 0 0 1-2-2 1.6 1.6 0 0 0 0-3.2A1.6 1.6 0 0 1 5 8z"></path>
          </svg>
        </div>
        <span
          className="text-[#fff] font-[800] text-[24px]"
          style={{ letterSpacing: '-1px', paddingBottom: '2px' }}
        >
          MOA TICKETS
        </span>
      </Link>
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
