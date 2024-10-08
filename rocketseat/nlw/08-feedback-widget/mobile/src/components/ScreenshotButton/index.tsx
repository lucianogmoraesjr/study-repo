import { Image, TouchableOpacity, View } from 'react-native'

import { styles } from './styles'
import { Camera, Trash } from 'phosphor-react-native'
import { theme } from '../../theme'

interface ScreenshotButtonProps {
  screenshot: string | null
  onTakeShot: () => void
  onRemoveShot: () => void
}

export function ScreenshotButton({
  screenshot,
  onRemoveShot,
  onTakeShot,
}: ScreenshotButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveShot : onTakeShot}
    >
      {screenshot ? (
        <View>
          <Image style={styles.image} source={{ uri: screenshot }} />

          <Trash
            size={22}
            color={theme.colors.text_secondary}
            weight="fill"
            style={styles.removeIcon}
          />
        </View>
      ) : (
        <Camera size={24} color={theme.colors.text_secondary} weight="bold" />
      )}
    </TouchableOpacity>
  )
}
