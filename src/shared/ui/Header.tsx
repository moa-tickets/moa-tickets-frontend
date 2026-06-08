import Link from 'next/link'
import LogoLink from './LogoLink'

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <LogoLink
          logoSize={32}
          textClassName="font-bold text-xl tracking-tight text-gray-900"
          containerClassName="flex items-center gap-3 hover:opacity-80 transition"
        />

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            href="/concerts"
            className="text-gray-700 hover:text-[#ed4543] transition font-medium text-base"
          >
            공연
          </Link>
          <Link
            href="/bookings"
            className="text-gray-700 hover:text-[#ed4543] transition font-medium text-base"
          >
            예매내역
          </Link>
          <Link
            href="/profile"
            className="text-gray-700 hover:text-[#ed4543] transition font-medium text-base"
          >
            마이페이지
          </Link>
        </nav>

        {/* Auth Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-gray-700 hover:text-[#ed4543] transition font-medium text-base"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="bg-[#ed4543] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium text-base"
          >
            회원가입
          </Link>
        </div>
      </div>
    </header>
  )
}
