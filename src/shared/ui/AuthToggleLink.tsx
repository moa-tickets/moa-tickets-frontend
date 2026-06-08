'use client'

import { useRouter } from 'next/navigation'

interface AuthToggleLinkProps {
  text: string
  linkText: string
  href: string
}

export default function AuthToggleLink({ text, linkText, href }: AuthToggleLinkProps) {
  const router = useRouter()

  return (
    <div className="flex gap-[10px] justify-center text-[14px] text-[#5c5955] mt-[20px] mb-[30px]">
      <span>{text}</span>
      <button
        type="button"
        className="bg-transparent text-[14px] text-[#ED4543] cursor-pointer"
        onClick={() => router.push(href)}
      >
        {linkText}
      </button>
    </div>
  )
}
