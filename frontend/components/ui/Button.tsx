import { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ children, variant = 'primary', className = '', ...props }: Props) {
  const base = 'transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-700 px-6 py-2.5 text-sm font-medium tracking-wide',
    secondary: 'bg-white text-gray-900 border border-gray-400 hover:bg-gray-50 px-6 py-2.5 text-sm font-medium',
    ghost: 'text-gray-600 hover:text-gray-900 text-sm underline underline-offset-2',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
