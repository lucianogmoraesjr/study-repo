import { Text, View } from 'react-native'

import { Copyright } from '../Copyright'

import { feedbackTypes } from '../../utils/feedbackTypes'

import { styles } from './styles'
import { Option } from '../Option'
import { FeedbackType } from '../Widget'

interface OptionsProps {
  onFeedbackTypeChange: (feedbackType: FeedbackType) => void
}

export function Options({ onFeedbackTypeChange }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            onPress={() => onFeedbackTypeChange(key as FeedbackType)}
            key={key}
            image={value.image}
            title={value.title}
          />
        ))}
      </View>

      <Copyright />
    </View>
  )
}
