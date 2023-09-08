import { ButtonHTMLAttributes, ReactNode } from 'react'

import './styles.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isOutlined?: boolean
}

export function Button({
  children,
  isOutlined = false,
  ...props
}: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}>
      {children}
    </button>
  )
}
