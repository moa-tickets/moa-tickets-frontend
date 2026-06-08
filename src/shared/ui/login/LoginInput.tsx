import { cn } from '@/shared/lib'

export default function LoginInput({
  label,
  type,
  placeholder,
}: {
  label: string
  type: string
  placeholder: string
}) {
  return (
    <div className={cn('login__input__container flex flex-col mb-[16px]')}>
      <label className="text-[#5c5955] text-[14px] font-[600] mb-[10px]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          'w-[460px] border border-[#5c5955] box-border py-[10px] px-[16px] outline-[#ED4543] rounded-[10px] text-[14px]'
        )}
      />
    </div>
  )
}
