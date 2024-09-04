import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { cn } from '../utils/cn'

const buttonVariants = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg',

  variants: {
    variant: {
      primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
      secondary: 'bg-zinc-800 px-5 text-zinc-200 hover:bg-zinc-700',
    },

    size: {
      default: 'px-5 py-2',
      full: 'h-11 w-full',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function Button({
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
