import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    yellowAlpha: {
      '400': 'rgba(255, 186, 8, 0.5)',
    },
    yellow: {
      '400': '#ffba08',
    },
    gray: {
      '600': '#47585b',
      '500': '#999999',
      '100': '#DADADA',
      '50': '#f5f8fa',
    },
  },
  fonts: {
    heading: 'var(--font-poppins)',
    body: 'var(--font-poppins)',
  },
  styles: {
    global: {
      body: {
        bg: '#F5F8FA',
        color: 'gray.600',
      },
    },
  },
})
