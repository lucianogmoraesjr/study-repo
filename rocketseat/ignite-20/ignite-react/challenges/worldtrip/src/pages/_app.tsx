/* eslint-disable react/no-unknown-property */
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '@/styles/theme'

import '../styles/global.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-poppins: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}
