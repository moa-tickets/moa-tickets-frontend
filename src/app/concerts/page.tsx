import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/shared/ui/Header'

export const metadata: Metadata = {
  title: 'Concerts',
}

interface Concert {
  id: string
  title: string
  artist: string
  date: string
  venue: string
  genre: string
  price: number
  image: string
}

const allConcerts: Concert[] = [
  {
    id: '1',
    title: 'Summer Festival 2024',
    artist: 'Various Artists',
    date: '2024-07-15',
    venue: 'Seoul Olympic Stadium',
    genre: 'Multi-Genre',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'K-Pop Concert',
    artist: 'BTS',
    date: '2024-08-20',
    venue: 'Jamsil Arena',
    genre: 'K-Pop',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Jazz Night',
    artist: 'Local Jazz Band',
    date: '2024-09-10',
    venue: 'Blue Note Club',
    genre: 'Jazz',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Rock Concert',
    artist: 'Classic Rock Band',
    date: '2024-10-05',
    venue: 'Olympic Gymnastics Arena',
    genre: 'Rock',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=300&fit=crop',
  },
  {
    id: '5',
    title: 'Classical Symphony',
    artist: 'Seoul Philharmonic',
    date: '2024-11-12',
    venue: 'Seoul Arts Center',
    genre: 'Classical',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1516996122274-23ee3cba3561?w=500&h=300&fit=crop',
  },
  {
    id: '6',
    title: 'Pop Festival',
    artist: 'Various Pop Artists',
    date: '2024-12-01',
    venue: 'Seoul World Cup Stadium',
    genre: 'Pop',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=300&fit=crop',
  },
]

export default function ConcertsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">전체 공연</h1>
            <p className="text-gray-600 text-base sm:text-lg">
              멋진 라이브 공연의 티켓을 발견하고 예매하세요
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
            <input
              type="text"
              placeholder="공연을 검색하세요..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed4543]"
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <select className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed4543]">
                <option value="">모든 장르</option>
                <option value="pop">팝</option>
                <option value="rock">락</option>
                <option value="jazz">재즈</option>
                <option value="classical">클래식</option>
                <option value="kpop">K-팝</option>
              </select>
              <select className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed4543]">
                <option value="">가격대</option>
                <option value="0-50">₩50,000 미만</option>
                <option value="50-100">₩50,000 - ₩100,000</option>
                <option value="100-200">₩100,000 - ₩200,000</option>
                <option value="200+">₩200,000 이상</option>
              </select>
            </div>
          </div>

          {/* Concert Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allConcerts.map((concert) => (
              <div
                key={concert.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group"
              >
                <div className="overflow-hidden h-48 bg-gray-200 relative">
                  <img
                    src={concert.image}
                    alt={concert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-4 right-4 bg-[#ed4543] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {concert.genre}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{concert.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{concert.artist}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {concert.date} • {concert.venue}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#ed4543]">
                      ₩{concert.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/concerts/${concert.id}`}
                      className="bg-[#ed4543] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold text-sm"
                    >
                      예매
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
