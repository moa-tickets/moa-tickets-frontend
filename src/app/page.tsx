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
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#311917] via-[#2a1410] to-black text-white px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight tracking-tight">
                무대의 첫 줄
                <br />
                가장 가까운 자리에서
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-10 sm:mb-12 font-light">
                콘서트, 뮤지컬, 연극, 클래식, 스포츠까지.
                <br />
                지금 MOA TICKET에서 만나보세요.
              </p>
              <Link
                href="/concerts"
                className="inline-block bg-[#ed4543] text-white px-10 sm:px-12 py-4 sm:py-5 rounded-lg font-bold text-base sm:text-lg hover:bg-[#d63a35] transition-colors duration-200"
              >
                공연 둘러보기
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-gray-600">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase tracking-widest">
                  누적 예매
                </p>
                <p className="text-3xl sm:text-5xl font-bold">1,200만+</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase tracking-widest">
                  공연/이벤트
                </p>
                <p className="text-3xl sm:text-5xl font-bold">8,400+</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase tracking-widest">
                  앱 평점
                </p>
                <p className="text-3xl sm:text-5xl font-bold">4.9</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Concerts Section */}
        <section className="px-4 sm:px-6 py-20 sm:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">예정된 공연</h2>
              <p className="text-gray-600 text-base sm:text-lg">
                지금 예매할 수 있는 다양한 공연들을 만나보세요
              </p>
            </div>

            {/* Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {upcomingConcerts.map((concert) => (
                <div
                  key={concert.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gray-200 h-56 sm:h-64">
                    <img
                      src={concert.image}
                      alt={concert.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Genre Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-[#ed4543] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {concert.genre}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {concert.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{concert.artist}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4">
                      {concert.date} • {concert.venue}
                    </p>

                    {/* Price */}
                    <div className="mb-5">
                      <p className="text-xs text-gray-500 font-medium mb-1">가격</p>
                      <p className="text-base sm:text-lg font-bold text-[#ed4543]">
                        {concert.price}
                      </p>
                    </div>

                    {/* Button */}
                    <Link
                      href={`/concerts/${concert.id}`}
                      className="block w-full bg-[#ed4543] text-white text-center py-3 rounded-lg hover:bg-[#d63a35] transition-colors duration-200 font-semibold text-sm sm:text-base"
                    >
                      예매하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#ed4543] to-[#d63a35] text-white px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
              놓치지 마세요
            </h2>
            <p className="text-lg sm:text-xl mb-10 sm:mb-12 text-red-100 font-light">
              좋아하는 아티스트의 소식을 받고 <br className="hidden sm:inline" />
              가장 먼저 공연 정보를 확인하세요
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-[#ed4543] px-10 sm:px-12 py-4 sm:py-5 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              지금 시작하기
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
