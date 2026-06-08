import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function FormField({ label, type = 'text', ...props }: FormFieldProps) {
  return (
    <div className="mb-[15px]">
      <label className="block text-[14px] font-[700] mb-[8px]">{label}</label>
      <input
        type={type}
        className="w-full px-[12px] py-[10px] border border-[#ddd] rounded-[8px] focus:outline-none focus:border-[#ed4543]"
        {...props}
      />
    </div>
  )
}
