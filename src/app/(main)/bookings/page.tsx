import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'My Bookings',
}

interface Booking {
  id: string
  concertTitle: string
  artist: string
  date: string
  venue: string
  ticketCount: number
  totalPrice: number
  status: 'confirmed' | 'completed' | 'cancelled'
  bookingDate: string
}

const bookings: Booking[] = [
  {
    id: 'BK001',
    concertTitle: 'K-Pop Concert',
    artist: 'BTS',
    date: '2024-08-20',
    venue: 'Jamsil Arena',
    ticketCount: 2,
    totalPrice: 300000,
    status: 'confirmed',
    bookingDate: '2024-06-01',
  },
  {
    id: 'BK002',
    concertTitle: 'Jazz Night',
    artist: 'Local Jazz Band',
    date: '2024-09-10',
    venue: 'Blue Note Club',
    ticketCount: 1,
    totalPrice: 45000,
    status: 'confirmed',
    bookingDate: '2024-05-28',
  },
  {
    id: 'BK003',
    concertTitle: 'Summer Festival 2024',
    artist: 'Various Artists',
    date: '2024-07-15',
    venue: 'Seoul Olympic Stadium',
    ticketCount: 4,
    totalPrice: 320000,
    status: 'completed',
    bookingDate: '2024-05-15',
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
          확정
        </span>
      )
    case 'completed':
      return (
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
          완료
        </span>
      )
    case 'cancelled':
      return (
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
          취소
        </span>
      )
    default:
      return null
  }
}

export default function BookingsPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">예매 내역</h1>
              <p className="text-gray-600">예매한 공연 티켓을 확인하세요</p>
            </div>
            <Link
              href="/concerts"
              className="bg-[#ed4543] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-bold"
            >
              새로 예매하기
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">예매 내역이 없습니다</p>
              <Link
                href="/concerts"
                className="inline-block bg-[#ed4543] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-bold"
              >
                공연 둘러보기
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{booking.concertTitle}</h3>
                          <p className="text-gray-600">{booking.artist}</p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">날짜</p>
                          <p className="font-bold">{booking.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">장소</p>
                          <p className="font-bold">{booking.venue}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">티켓 수</p>
                          <p className="font-bold">{booking.ticketCount}장</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">예매일</p>
                          <p className="font-bold">{booking.bookingDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:text-right">
                      <p className="text-gray-500 text-sm mb-2">합계</p>
                      <p className="text-3xl font-bold text-[#ed4543] mb-4">
                        ₩{booking.totalPrice.toLocaleString()}
                      </p>
                      <div className="flex gap-2 flex-col">
                        <button className="bg-[#ed4543] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-bold">
                          티켓 확인
                        </button>
                        {booking.status === 'confirmed' && (
                          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-bold">
                            취소하기
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
