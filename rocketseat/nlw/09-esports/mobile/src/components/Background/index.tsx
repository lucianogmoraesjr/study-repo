import { ReactNode } from 'react'
import { ImageBackground } from 'react-native'

import backgroundImg from '../../assets/background-galaxy.png'

import { styles } from './styles'

interface BackroundProps {
  children: ReactNode
}

export function Background({ children }: BackroundProps) {
  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.container}
      defaultSource={backgroundImg}
    >
      {children}
    </ImageBackground>
  )
}
