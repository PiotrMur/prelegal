import { ReactNode } from 'react'

interface Props {
  htmlFor?: string
  children: ReactNode
  required?: boolean
  description?: string
  className?: string
}

export function Label({ htmlFor, children, required, description, className = '' }: Props) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={`block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1 ${className}`}
      >
        {children}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      {description && (
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      )}
    </div>
  )
}
