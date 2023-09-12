import { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { ChatTeardropDots } from 'phosphor-react-native'

import { Options } from '../Options'
import { theme } from '../../theme'
import { styles } from './styles'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Form } from '../Form'
import { Success } from '../Success'

export type FeedbackType = keyof typeof feedbackTypes

export function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleCancelFeedback() {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  function handleFeedbackSent() {
    setFeedbackSent(true)
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleCancelFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                onFeedbackCanceled={handleCancelFeedback}
                onFeedbackSent={handleFeedbackSent}
                feedbackType={feedbackType}
              />
            ) : (
              <Options onFeedbackTypeChange={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  )
}
