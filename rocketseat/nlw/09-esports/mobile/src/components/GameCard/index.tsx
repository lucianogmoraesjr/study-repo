import {
  ImageBackground,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { THEME } from '../../theme'
import { styles } from './styles'

export interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

interface GameCardProps extends TouchableOpacityProps {
  game: Game
}

export function GameCard({ game, ...props }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <ImageBackground style={styles.cover} source={{ uri: game.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{game.title}</Text>

          <Text style={styles.ads}>
            {game._count.ads} {game._count.ads === 1 ? 'anúncio' : 'anúncios'}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}
