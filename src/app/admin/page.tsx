import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">관리자 대시보드</h1>
          <p className="text-gray-300 mt-2">Moa Ticket 관리 시스템</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">총 공연</p>
            <p className="text-3xl font-bold">248</p>
            <p className="text-green-600 text-sm mt-2">↑ 12% 증가</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">총 예매</p>
            <p className="text-3xl font-bold">8,547</p>
            <p className="text-green-600 text-sm mt-2">↑ 23% 증가</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">총 매출</p>
            <p className="text-3xl font-bold">₩425M</p>
            <p className="text-green-600 text-sm mt-2">↑ 18% 증가</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">등록 회원</p>
            <p className="text-3xl font-bold">12,384</p>
            <p className="text-green-600 text-sm mt-2">↑ 8% 증가</p>
          </div>
        </div>

        {/* Admin Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <h2 className="text-2xl font-bold">공연 관리</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">공연 정보를 등록, 수정, 삭제할 수 있습니다.</p>
              <div className="space-y-2">
                <Link
                  href="/admin/concerts"
                  className="block px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition font-semibold"
                >
                  공연 목록
                </Link>
                <Link
                  href="/admin/concerts/create"
                  className="block px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition font-semibold"
                >
                  새 공연 등록
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-purple-600 text-white p-6">
              <h2 className="text-2xl font-bold">매출 분석</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">매출 데이터와 통계를 확인할 수 있습니다.</p>
              <div className="space-y-2">
                <Link
                  href="/admin/analytics"
                  className="block px-4 py-2 bg-purple-50 text-purple-600 rounded hover:bg-purple-100 transition font-semibold"
                >
                  매출 통계
                </Link>
                <Link
                  href="/admin/analytics/detailed"
                  className="block px-4 py-2 bg-purple-50 text-purple-600 rounded hover:bg-purple-100 transition font-semibold"
                >
                  상세 분석
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-green-600 text-white p-6">
              <h2 className="text-2xl font-bold">회원 관리</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">회원 정보를 관리하고 통계를 확인합니다.</p>
              <div className="space-y-2">
                <Link
                  href="/admin/users"
                  className="block px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition font-semibold"
                >
                  회원 목록
                </Link>
                <Link
                  href="/admin/users/statistics"
                  className="block px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition font-semibold"
                >
                  회원 통계
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-orange-600 text-white p-6">
              <h2 className="text-2xl font-bold">설정</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">시스템 설정과 관리자 정보를 관리합니다.</p>
              <div className="space-y-2">
                <Link
                  href="/admin/settings"
                  className="block px-4 py-2 bg-orange-50 text-orange-600 rounded hover:bg-orange-100 transition font-semibold"
                >
                  시스템 설정
                </Link>
                <Link
                  href="/admin/settings/admins"
                  className="block px-4 py-2 bg-orange-50 text-orange-600 rounded hover:bg-orange-100 transition font-semibold"
                >
                  관리자 관리
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-100 border-b p-6">
            <h2 className="text-2xl font-bold">최근 활동</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-semibold">새로운 공연 등록</p>
                  <p className="text-sm text-gray-500">K-Pop Concert by BTS</p>
                </div>
                <p className="text-sm text-gray-500">2분 전</p>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-semibold">예매 완료</p>
                  <p className="text-sm text-gray-500">사용자 12345명이 예매</p>
                </div>
                <p className="text-sm text-gray-500">1시간 전</p>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-semibold">새 회원 가입</p>
                  <p className="text-sm text-gray-500">총 45명 신규 가입</p>
                </div>
                <p className="text-sm text-gray-500">3시간 전</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">문의 접수</p>
                  <p className="text-sm text-gray-500">총 12건의 고객 문의</p>
                </div>
                <p className="text-sm text-gray-500">5시간 전</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
