export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <div
      id="logoBox"
      className="bg-[#ed4543] rounded-[10px] flex justify-center items-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.48}
        height={size * 0.48}
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
  )
}
