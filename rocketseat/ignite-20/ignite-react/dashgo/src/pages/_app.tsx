/* eslint-disable react/no-unknown-property */
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { makeServer } from '@/services/mirage'
import { queryClient } from '@/services/queryClient'
import { SidebarDrawerProvider } from '@/contexts/SidebarDrawerContext'
import { theme } from '@/styles/theme'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-rubik: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}
