import { Header } from '@/components/Header'
import type { AppProps } from 'next/app'
import { Inter, Lexend } from 'next/font/google'

import { Player } from '@/components/Player'
import { PlayerProvider } from '@/contexts/PlayerContext'

import '../styles/global.scss'
import styles from '../styles/app.module.scss'

const inter = Inter({ subsets: ['latin'] })
const lexend = Lexend({ subsets: ['latin'], weight: ['600'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.wrapper}>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-lexend: ${lexend.style.fontFamily};
          }
        `}
      </style>

      <PlayerProvider>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </PlayerProvider>
    </div>
  )
}
