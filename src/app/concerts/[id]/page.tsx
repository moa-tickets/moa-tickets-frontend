import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/shared/ui/Header'

export const metadata: Metadata = {
  title: 'Concert Details',
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function ConcertDetailPage({ params }: Props) {
  const { id } = await params

  const concert = {
    id,
    title: 'Summer Festival 2024',
    artist: 'Various Artists',
    date: '2024-07-15',
    time: '18:00',
    venue: 'Seoul Olympic Stadium',
    genre: 'Multi-Genre',
    price: 80000,
    description:
      'Join us for an unforgettable summer festival featuring top artists from around the world. This year&apos;s lineup includes some of the hottest acts in music. Bring your friends and family for a day filled with amazing performances, great food, and wonderful memories.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop',
    seats_available: 150,
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <Link href="/concerts" className="text-[#ed4543] hover:underline font-medium">
              ← 공연 목록으로 돌아가기
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <img
                src={concert.image}
                alt={concert.title}
                className="w-full h-96 object-cover rounded-xl mb-8"
              />

              <div className="bg-white rounded-xl p-8 mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{concert.title}</h1>
                    <p className="text-2xl text-gray-600">{concert.artist}</p>
                  </div>
                  <span className="bg-[#ed4543] text-white px-4 py-2 rounded-lg font-bold">
                    {concert.genre}
                  </span>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-2">날짜</p>
                    <p className="text-lg font-bold">{concert.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-2">시간</p>
                    <p className="text-lg font-bold">{concert.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-2">장소</p>
                    <p className="text-lg font-bold">{concert.venue}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-2">남은 좌석</p>
                    <p className="text-lg font-bold">{concert.seats_available}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">이 공연 소개</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">{concert.description}</p>

                  <div className="bg-[#fef2f2] border border-[#fed7d7] rounded-lg p-6">
                    <p className="font-bold text-[#ed4543] mb-3">주의사항</p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• VIP 티켓 소유자는 조기 입장 가능</li>
                      <li>• 음식 및 음료는 현장에서 구매 가능</li>
                      <li>• 입장 시 유효한 신분증 필수</li>
                      <li>• 외부 음료 반입 불가</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking */}
            <div>
              <div className="bg-white rounded-xl p-8 sticky top-24">
                <div className="mb-8">
                  <p className="text-gray-500 text-sm mb-2">시작 가격</p>
                  <p className="text-4xl font-bold text-[#ed4543] mb-2">
                    ₩{concert.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">1매당</p>
                </div>

                <div className="mb-8 pb-8 border-b">
                  <p className="text-sm text-gray-600 mb-3">남은 좌석</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(concert.seats_available / 200) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold">{concert.seats_available} 매</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="ticket-type"
                      value="standard"
                      defaultChecked
                      className="w-4 h-4"
                    />
                    <span className="ml-3 flex-1 font-medium">일반석</span>
                    <span className="font-bold">₩{concert.price.toLocaleString()}</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="radio" name="ticket-type" value="vip" className="w-4 h-4" />
                    <span className="ml-3 flex-1 font-medium">VIP석</span>
                    <span className="font-bold">₩{(concert.price * 1.5).toLocaleString()}</span>
                  </label>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold mb-3">매수</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed4543]">
                    <option value="1">1 매</option>
                    <option value="2">2 매</option>
                    <option value="3">3 매</option>
                    <option value="4">4 매</option>
                    <option value="5">5 매</option>
                  </select>
                </div>

                <Link
                  href="/login"
                  className="w-full bg-[#ed4543] text-white py-3 rounded-lg font-bold hover:bg-red-600 transition text-center block mb-3"
                >
                  예매하기
                </Link>

                <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
                  ♥ 찜하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
