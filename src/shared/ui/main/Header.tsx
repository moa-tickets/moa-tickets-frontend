import Link from 'next/link'
import LogoLink from '../LogoLink'
import { LuSearchCheck } from "react-icons/lu";
import { FaBars } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <LogoLink
          logoSize={32}
          textClassName="font-[800] text-[24px] tracking-tight text-gray-900"
          containerClassName="flex items-center gap-3 hover:opacity-80 transition"
        />
        <nav className="flex items-center gap-[6px]">
          <Link href="/" className="px-[16px] py-[20px] text-[#5c5955] font-[600]">홈</Link>
          <Link href="/concerts" className="px-[16px] py-[20px] text-[#5c5955] font-[600]">공연</Link>
          <Link href="/bookings" className="px-[16px] py-[20px] text-[#5c5955] font-[600]">예매내역</Link>
          <Link href="/profile" className="px-[16px] py-[20px] text-[#5c5955] font-[600]">마이페이지</Link>
          <Link href="/admin" className="px-[16px] py-[20px] text-[#5c5955] font-[600]">관리자</Link>
        </nav>
        <ul className="flex items-center gap-[10px]">
          <li className="flex items-center">
            <button className='w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[black] hover:text-[#fff] hover:font-[600] transition-all duration-300'>
              <LuSearchCheck size={24} color={"#5c5955"} />
            </button>
          </li>
          <li className="lg:block hidden">
            <Link href="/auth/login" className='px-[16px] py-[10px] hover:bg-[#ed4543] hover:text-[#fff] hover:font-[600] rounded-[10px] transition-all duration-300'>
              로그인
            </Link>
          </li>
          <li className="lg:block hidden">
            <Link href="/auth/signup" className='px-[16px] py-[10px] text-[#fff] bg-[#ed4543] rounded-[10px] font-[600]'>
              회원가입
            </Link>
          </li>
          <li className="lg:hidden flex items-center">
            <button className='w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[black] hover:text-[#fff] hover:font-[600] transition-all duration-300'>
              <FaBars size={20} color={"#5c5955"} />
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
