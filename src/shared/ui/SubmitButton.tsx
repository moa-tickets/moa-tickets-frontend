import type { ButtonHTMLAttributes } from 'react'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function SubmitButton({ children, className = '', ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`w-full py-[12px] bg-[#ed4543] rounded-[10px] text-[#fff] font-[700] mb-[20px] hover:bg-[#d63a35] transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
