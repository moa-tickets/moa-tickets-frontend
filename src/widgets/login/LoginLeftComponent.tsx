import Link from 'next/link'

export default function LoginLeftComponent() {
  return (
    <div className="w-1/2 h-screen bg-radial-[at_100%_0%] from-[#311917] to-[#000] box-border px-[45px] py-[40px] flex-col flex">
      <Link href="/" className="flex items-center gap-[16px] mb-[160px]">
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
            data-om-id="jsx:/https:/d945bfba-3784-43f4-bf20-deb8d8b5e787.claudeusercontent.com/v1/design/projects/d945bfba-3784-43f4-bf20-deb8d8b5e787/serve/onstage/ui.jsx?v=2:4189:55:9"
          >
            <path
              d="M5 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2 1.6 1.6 0 0 0 0 3.2 1.6 1.6 0 0 1 0 3.2 2 2 0 0 1-2 2H7a2 2 0 0 1-2-2 1.6 1.6 0 0 0 0-3.2A1.6 1.6 0 0 1 5 8z"
              data-om-id="jsx:/https:/d945bfba-3784-43f4-bf20-deb8d8b5e787.claudeusercontent.com/v1/design/projects/d945bfba-3784-43f4-bf20-deb8d8b5e787/serve/onstage/ui.jsx?v=2:4373:57:11"
              data-cc-id="cc-3"
            ></path>
          </svg>
        </div>
        <span
          className="text-[#fff] font-[800] text-[24px]"
          style={{ letterSpacing: '-1px', paddingBottom: '2px' }}
        >
          MOA TICKETS
        </span>
      </Link>
      <p className="text-[#fff] font-[800] text-[48px] leading-[1.1] mb-[20px]">
        무대의 첫 줄 <br />
        가장 가까운 자리에서
      </p>
      <p className="text-[#fff] font-[300] text-[22px] mb-[50px]">
        콘서트, 뮤지컬, 연극, 클래식, 스포츠까지. <br />
        지금 MOA TICKET에서 예매하세요.
      </p>
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
    </div>
  )
}
