import { StyleSheet, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface EnvironmentButtonProps extends RectButtonProps {
  title: string
  active?: boolean
}

export function EnvironmentButton({
  title,
  active = false,
  ...props
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[styles.container, active && styles.containerActive]}
      {...props}
    >
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 4,
  },

  containerActive: {
    backgroundColor: colors.green_light,
  },

  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },

  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
})
