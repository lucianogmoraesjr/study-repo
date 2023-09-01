import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quartiary'
}

export function Button({ children, variant, ...rest }: ButtonProps) {
  return (
    <button className={variant} {...rest}>
      {children}
    </button>
  )
}
