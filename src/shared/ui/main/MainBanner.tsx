export default function MainBanner() {
  return (
    <section className="w-full bg-gradient-to-r from-[#1a2b4d] to-[#0f1a2e] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end">
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-2">콘서트 · 예술 수준</p>
            <h1 className="text-white font-bold text-5xl leading-tight mb-4">
              클드플레이 내한공연 : Music of<br />the Spheres
            </h1>
            <p className="text-gray-300 text-sm mb-6 flex items-center gap-4">
              <span>📅 2026.07.18 ~ 2026.07.20</span>
              <span>📍 강남예술문화홀 주공개관</span>
            </p>
            <div className="flex gap-3">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded transition">
                예매하기
              </button>
              <button className="bg-transparent border border-white text-white font-bold px-6 py-2 rounded hover:bg-white hover:text-gray-900 transition">
                상세보기
              </button>
            </div>
          </div>
          <div className="w-64 h-48 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
            [이미지 영역]
          </div>
        </div>
      </div>
    </section>
  )
}
