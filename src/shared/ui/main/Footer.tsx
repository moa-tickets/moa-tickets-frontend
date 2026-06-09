export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-bold text-gray-900 mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">공연 예매</a></li>
              <li><a href="#" className="hover:text-gray-900">랭킹</a></li>
              <li><a href="#" className="hover:text-gray-900">이벤트</a></li>
              <li><a href="#" className="hover:text-gray-900">기프트카드</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">공지사항</a></li>
              <li><a href="#" className="hover:text-gray-900">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-gray-900">1:1 문의</a></li>
              <li><a href="#" className="hover:text-gray-900">쿠시-환불</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">회사</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">회사 소개</a></li>
              <li><a href="#" className="hover:text-gray-900">채용 문의</a></li>
              <li><a href="#" className="hover:text-gray-900">제휴 문의</a></li>
              <li><a href="#" className="hover:text-gray-900">이용약관</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            라이브 공연 예매 플랫폼, 본 사이트는 디자인 시연용입니다.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            © 2026 MOA TICKETS. Design prototype.
          </p>
        </div>
      </div>
    </footer>
  )
}
