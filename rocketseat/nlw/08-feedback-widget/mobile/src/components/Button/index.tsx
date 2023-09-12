import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { styles } from './styles'
import { theme } from '../../theme'

interface ButtonProps extends TouchableOpacityProps {
  isLoading: boolean
}

export function Button({ isLoading, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.title}>Enviar feedback</Text>
      )}
    </TouchableOpacity>
  )
}
