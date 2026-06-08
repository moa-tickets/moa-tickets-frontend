interface TermsCheckboxProps {
  label: React.ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  id?: string
}

export default function TermsCheckbox({
  label,
  checked,
  onChange,
  id = 'terms',
}: TermsCheckboxProps) {
  return (
    <div className="pt-[10px] mb-[20px]">
      <div className="flex items-center gap-[8px] mb-[10px]">
        <input
          type="checkbox"
          id={id}
          className="w-4 h-4 accent-[#ed4543]"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <label htmlFor={id} className="text-[14px] text-[#5c5955]">
          {label}
        </label>
      </div>
    </div>
  )
}
