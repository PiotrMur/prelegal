import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: Props) {
  const base =
    'w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500'

  return <input className={`${base} ${className}`} {...props} />
}
