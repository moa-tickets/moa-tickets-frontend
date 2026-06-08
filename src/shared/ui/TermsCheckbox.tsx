import type { InputHTMLAttributes } from 'react'

interface TermsCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
}

export default function TermsCheckbox({
  id = 'terms',
  label = (
    <>
      만 14세 이상이며, 이용약관 및 <span className="text-[#ed4543]">개인정보 처리정책</span>에
      동의합니다.
    </>
  ),
  ...props
}: TermsCheckboxProps) {
  return (
    <div className="pt-[10px] mb-[20px]">
      <div className="flex items-center gap-[8px] mb-[10px]">
        <input type="checkbox" id={id} className="w-4 h-4 accent-[#ed4543]" {...props} />
        <label htmlFor={id} className="text-[14px] text-[#5c5955]">
          {label}
        </label>
      </div>
    </div>
  )
}
