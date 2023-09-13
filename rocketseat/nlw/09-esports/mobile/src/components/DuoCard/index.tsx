import { TouchableOpacity, View, Text } from 'react-native'
import { GameController } from 'phosphor-react-native'

import { styles } from './styles'
import { DuoInfo } from '../DuoInfo'
import { THEME } from '../../theme'

export interface Duo {
  id: string
  name: string
  yearsPlaying: number
  weekDays: Array<string>
  hourStart: string
  hourEnd: string
  useVoiceChannel: boolean
}

interface DuoCardProps {
  duo: Duo
  onConnect: () => void
}

export function DuoCard({ duo, onConnect }: DuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={duo.name} />
      <DuoInfo label="Tempo de jogo" value={`${duo.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${duo.weekDays.length} dias \u2022 ${duo.hourStart} - ${duo.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={duo.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={
          duo.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
    </View>
  )
}
