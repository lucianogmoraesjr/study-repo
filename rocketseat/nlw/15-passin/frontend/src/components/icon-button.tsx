import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  'border border-white/10 rounded-md p-1.5 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-black/20',
        secondary: 'bg-white/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface IconButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

export function IconButton({ variant, className, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={cn(buttonVariants({ variant, className }))}
    />
  )
}
