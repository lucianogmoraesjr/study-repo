import React from 'react'
import { IInputProps, Input as NativeBaseInput } from 'native-base'

type InputProps = IInputProps

export function Input({ ...props }: InputProps) {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: 'green.500',
        bg: 'gray.700',
      }}
      {...props}
    />
  )
}
