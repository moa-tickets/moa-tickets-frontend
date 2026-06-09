import dynamic from 'next/dynamic'
import MainBanner from '@/shared/ui/main/MainBanner'

const SeatGradeSection = dynamic(() => import('@/shared/ui/main/SeatGradeSection'), { ssr: true })
const ConcertGrid = dynamic(() => import('@/shared/ui/main/ConcertGrid'), { ssr: true })
const Footer = dynamic(() => import('@/shared/ui/main/Footer'), { ssr: true })

const mockConcerts = [
  { id: '1', title: '클드플레이 내한공연 : Music of the Spheres', artist: '클드플레이' },
  { id: '2', title: '뮤지컬(오페라의 유령)', artist: '뮤지컬', badgeColor: 'red' as const },
  { id: '3', title: '2026 아이유 콘서트 (The Golden Hour)', artist: '아이유' },
  { id: '4', title: '클드플레이 내한공연 : Music of the Spheres', artist: '클드플레이' },
  { id: '5', title: '뮤지컬(오페라의 유령)', artist: '뮤지컬' },
]

export default function HomePage() {
  return (
    <main className="w-full">
      <MainBanner />
      <SeatGradeSection />
      <ConcertGrid
        title="오늘 예징 · 단독판매"
        subtitle="ONSTAGE에서 단독 공연"
        concerts={mockConcerts}
      />
      <Footer />
    </main>
  )
}
