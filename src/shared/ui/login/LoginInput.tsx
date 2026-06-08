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
    <div className="mb-[15px]">
      <label className="block text-[14px] font-[700] mb-[8px]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-[12px] py-[10px] border border-[#ddd] rounded-[8px] focus:outline-none focus:border-[#ed4543]"
      />
    </div>
  )
}
