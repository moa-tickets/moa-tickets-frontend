import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'My Profile',
}

export default function ProfilePage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#ed4543] to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <h2 className="text-xl font-bold mb-1">김세중</h2>
                  <p className="text-gray-600 text-sm">sejoong@example.com</p>
                </div>

                <nav className="space-y-2">
                  <Link
                    href="#profile"
                    className="block px-4 py-2 rounded-lg bg-[#fef2f2] text-[#ed4543] font-bold hover:bg-red-100 transition"
                  >
                    프로필 정보
                  </Link>
                  <Link
                    href="/bookings"
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    예매 내역
                  </Link>
                  <Link
                    href="#favorites"
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    찜한 공연
                  </Link>
                  <button className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition font-bold">
                    로그아웃
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Form */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">프로필 정보</h2>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">이름</label>
                    <input
                      type="text"
                      defaultValue="김세중"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed4543]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">이메일</label>
                    <input
                      type="email"
                      defaultValue="sejoong@example.com"
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">휴대폰 번호</label>
                    <input
                      type="tel"
                      defaultValue="010-1234-5678"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed4543]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ed4543] text-white py-2 rounded-lg font-bold hover:bg-red-600 transition"
                  >
                    저장하기
                  </button>
                </form>
              </div>

              {/* Password Change */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">비밀번호 변경</h2>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">현재 비밀번호</label>
                    <input
                      type="password"
                      placeholder="현재 비밀번호를 입력해주세요"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed4543]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">새 비밀번호</label>
                    <input
                      type="password"
                      placeholder="새 비밀번호를 입력해주세요"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed4543]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">새 비밀번호 확인</label>
                    <input
                      type="password"
                      placeholder="새 비밀번호를 다시 입력해주세요"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed4543]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ed4543] text-white py-2 rounded-lg font-bold hover:bg-red-600 transition"
                  >
                    변경하기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
