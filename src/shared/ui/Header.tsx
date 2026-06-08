import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-[#ed4543] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              width="16"
              height="16"
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
          <span className="hidden sm:inline font-bold text-xl tracking-tight">MOA TICKETS</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 sm:gap-8">
          <Link
            href="/concerts"
            className="text-gray-700 hover:text-[#ed4543] transition font-medium text-sm sm:text-base"
          >
            공연
          </Link>
          <Link
            href="/bookings"
            className="text-gray-700 hover:text-[#ed4543] transition font-medium text-sm sm:text-base"
          >
            예매내역
          </Link>
          <Link
            href="/profile"
            className="text-gray-700 hover:text-[#ed4543] transition font-medium text-sm sm:text-base"
          >
            마이페이지
          </Link>
        </nav>

        {/* Auth Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            className="text-gray-700 hover:text-[#ed4543] transition font-medium text-sm sm:text-base"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="bg-[#ed4543] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium text-sm sm:text-base"
          >
            회원가입
          </Link>
        </div>
      </div>
    </header>
  )
}
