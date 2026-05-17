interface Props {
  name: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  className?: string
}

export function RadioGroup({ name, value, onChange, options, className = '' }: Props) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer text-sm text-gray-800"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="accent-gray-900"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
