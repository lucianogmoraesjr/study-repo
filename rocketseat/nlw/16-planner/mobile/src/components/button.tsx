import { cn } from '@/utils/cn'
import { createContext, useContext } from 'react'
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'w-full h-11 flex-row items-center justify-center gap-2 rounded-lg',

  variants: {
    variant: {
      primary: 'bg-lime-300',
      secondary: 'bg-zinc-800',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

const VariantContext = createContext<VariantProps<typeof buttonVariants>>({})

type ButtonProps = TouchableOpacityProps &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean
  }

function Button({ className, variant, isLoading, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      <VariantContext.Provider value={{ variant }}>
        {isLoading ? (
          <ActivityIndicator
            className={cn(
              'text-lime-950',
              variant === 'secondary' && 'text-zinc-200',
            )}
          />
        ) : (
          props.children
        )}
      </VariantContext.Provider>
    </TouchableOpacity>
  )
}

type TitleProps = TextProps

function Title({ className, ...props }: TitleProps) {
  const { variant } = useContext(VariantContext)

  return (
    <Text
      className={cn(
        'font-semibold text-base text-lime-950',
        variant === 'secondary' && 'text-zinc-200',
        className,
      )}
      {...props}
    />
  )
}
Button.Title = Title

export { Button }
