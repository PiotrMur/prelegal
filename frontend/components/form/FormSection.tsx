import { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  className?: string
}

export function FormSection({ title, children, className = '' }: Props) {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-1.5 mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}
