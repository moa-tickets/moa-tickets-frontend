import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/shared/ui/Header'

export const metadata: Metadata = {
  title: 'MOA TICKET - 무대의 첫 줄, 가장 가까운 자리에서',
}

interface Concert {
  id: string
  title: string
  artist: string
  date: string
  venue: string
  image: string
  genre: string
  price: string
}

const upcomingConcerts: Concert[] = [
  {
    id: '1',
    title: 'Summer Festival 2024',
    artist: 'Various Artists',
    date: '2024-07-15',
    venue: 'Seoul Olympic Stadium',
    genre: 'Festival',
    price: '50,000~150,000',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'K-Pop Concert',
    artist: 'BTS',
    date: '2024-08-20',
    venue: 'Jamsil Arena',
    genre: 'K-Pop',
    price: '80,000~200,000',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Jazz Night',
    artist: 'Local Jazz Band',
    date: '2024-09-10',
    venue: 'Blue Note Club',
    genre: 'Jazz',
    price: '30,000~80,000',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Classical Symphony',
    artist: 'Seoul Philharmonic',
    date: '2024-08-05',
    venue: 'Seoul Arts Center',
    genre: 'Classical',
    price: '40,000~120,000',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
  },
  {
    id: '5',
    title: 'Musical Phantom',
    artist: 'Cast Ensemble',
    date: '2024-07-25',
    venue: 'Sejong Center',
    genre: 'Musical',
    price: '60,000~180,000',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=300&fit=crop',
  },
  {
    id: '6',
    title: 'Theater Play',
    artist: 'Drama Company',
    date: '2024-09-01',
    venue: 'National Theater',
    genre: 'Theater',
    price: '25,000~75,000',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white">
        {/* ===== HERO 섹션 ===== */}
        {/* 다크 그래디언트 배경, 큰 제목, CTA 버튼 */}
        <section className="w-full bg-gradient-to-b from-[#311917] via-[#1f0f0a] to-black text-white px-4 sm:px-6 py-24 sm:py-40">
          <div className="max-w-7xl mx-auto">
            {/* 제목 */}
            <div className="max-w-4xl mb-12 sm:mb-16">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
                무대의 첫 줄
                <br />
                가장 가까운 자리에서
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 font-light leading-relaxed">
                콘서트, 뮤지컬, 연극, 클래식, 스포츠까지.
                <br />
                지금 MOA TICKET에서 만나보세요.
              </p>
              {/* CTA 버튼 */}
              <Link
                href="/concerts"
                className="inline-block bg-[#ed4543] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-[#d63a35] transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                공연 둘러보기
              </Link>
            </div>

            {/* 통계 섹션 */}
            {/* 누적 예매, 공연/이벤트, 앱 평점 표시 */}
            <div className="border-t border-gray-700 pt-12 sm:pt-16">
              <div className="grid grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
                {/* 통계 1: 누적 예매 */}
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest font-medium mb-3 sm:mb-4">
                    누적 예매
                  </p>
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">1,200만+</p>
                </div>

                {/* 통계 2: 공연/이벤트 */}
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest font-medium mb-3 sm:mb-4">
                    공연/이벤트
                  </p>
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">8,400+</p>
                </div>

                {/* 통계 3: 앱 평점 */}
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest font-medium mb-3 sm:mb-4">
                    앱 평점
                  </p>
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">4.9</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 공연 그리드 섹션 ===== */}
        {/* 반응형 그리드 (모바일 1열, 태블릿 2열, 데스크톱 3열) */}
        <section className="w-full bg-white px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            {/* 섹션 제목 */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">예정된 공연</h2>
              <p className="text-gray-600 text-lg sm:text-xl">
                지금 예매할 수 있는 다양한 공연들을 만나보세요
              </p>
            </div>

            {/* 공연 카드 그리드 */}
            {/* 각 카드: 이미지, 제목, 아티스트, 날짜, 장소, 가격, 예매 버튼 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {upcomingConcerts.map((concert) => (
                <div
                  key={concert.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group border border-gray-100"
                >
                  {/* 카드 이미지 */}
                  <div className="relative overflow-hidden bg-gray-200 h-56 sm:h-64">
                    <img
                      src={concert.image}
                      alt={concert.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* 장르 배지 */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-[#ed4543] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {concert.genre}
                      </span>
                    </div>
                  </div>

                  {/* 카드 내용 */}
                  <div className="p-5 sm:p-6">
                    {/* 제목 */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 h-14">
                      {concert.title}
                    </h3>

                    {/* 아티스트 */}
                    <p className="text-sm text-gray-600 font-medium mb-2">{concert.artist}</p>

                    {/* 날짜 & 장소 */}
                    <p className="text-xs sm:text-sm text-gray-500 mb-4">
                      {concert.date} • {concert.venue}
                    </p>

                    {/* 가격 */}
                    <div className="mb-5 pb-5 border-b border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-1">가격</p>
                      <p className="text-lg sm:text-xl font-bold text-[#ed4543]">{concert.price}</p>
                    </div>

                    {/* 예매 버튼 */}
                    <Link
                      href={`/concerts/${concert.id}`}
                      className="block w-full bg-[#ed4543] text-white text-center py-3 rounded-lg hover:bg-[#d63a35] transition-colors duration-200 font-semibold text-sm sm:text-base shadow-sm hover:shadow-md"
                    >
                      예매하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA 섹션 ===== */}
        {/* 회원가입 유도 */}
        <section className="w-full bg-gradient-to-r from-[#ed4543] via-[#e63c33] to-[#d63a35] text-white px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              놓치지 마세요
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-10 sm:mb-12 font-light leading-relaxed">
              좋아하는 아티스트의 소식을 받고
              <br className="hidden sm:inline" /> 가장 먼저 공연 정보를 확인하세요
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-[#ed4543] px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              지금 시작하기
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
