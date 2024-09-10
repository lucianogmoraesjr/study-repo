import { colors } from '@/styles/colors'
import { cn } from '@/utils/cn'
import { Platform, TextInput, TextInputProps, View } from 'react-native'
import { tv, VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: 'px-4 h-14 rounded-lg border border-zinc-800 flex-row items-center gap-2',

  variants: {
    variant: {
      primary: 'min-h-16 max-h-16 border-0',
      secondary: 'bg-zinc-950',
      tertiary: 'bg-zinc-900',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type InputProps = React.ComponentProps<typeof View> &
  VariantProps<typeof inputVariants>

function Input({ className, variant, ...props }: InputProps) {
  return (
    <View className={cn(inputVariants({ variant }), className)} {...props} />
  )
}

function Field(props: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-lg leading-tight text-zinc-100"
      placeholderTextColor={colors.zinc[400]}
      cursorColor={colors.zinc[100]}
      selectionColor={Platform.OS === 'ios' ? colors.zinc[100] : undefined}
      {...props}
    />
  )
}

Input.Field = Field

export { Input }
