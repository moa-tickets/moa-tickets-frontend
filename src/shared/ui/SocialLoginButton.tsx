import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface SocialLoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
}

export default function SocialLoginButton({
  icon,
  label,
  className = '',
  ...props
}: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      className={`w-full bg-transparent border border-[#d8d3ce] rounded-[10px] py-[16px] mb-[10px] sm:text-[16px] text-[14px] font-[700] cursor-pointer flex justify-center items-center gap-[8px] ${className}`}
      {...props}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
