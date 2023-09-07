import { useState } from 'react'
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { isBefore, format } from 'date-fns'

import { Button } from '../components/Button'

import waterdropImg from '../assets/waterdrop.png'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { savePlant } from '../libs/storage'

interface PlantRouteParams {
  id: number
  name: string
  about: string
  water_tips: string
  photo: string
  environments: Array<string>
  frequency: {
    times: number
    repeat_every: string
  }
}

export function SavePlant() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

  const route = useRoute()

  const plant = route.params as PlantRouteParams

  const navigation = useNavigation()

  function handleOpenDateTimePicker() {
    setShowDatePicker((prevState) => !prevState)
  }

  function handleChangeTime(
    event: DateTimePickerEvent,
    dateTime: Date | undefined,
  ) {
    if (event.type === 'dismissed') {
      return
    }

    if (Platform.OS === 'android') {
      setShowDatePicker((prevState) => !prevState)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert('Escolha uma hora no futuro. ⏰')
    }

    if (dateTime) {
      setSelectedDateTime(dateTime)
    }
  }

  async function handleSavePlant() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      })

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle:
          'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      })
    } catch {
      Alert.alert('Não foi possível salvar sua planta 😥')
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} width={150} height={150} />

          <Text style={styles.plantName}>{plant.name}</Text>

          <Text style={styles.plantDescription}>{plant.about}</Text>
        </View>

        <View style={styles.controls}>
          <View style={styles.tipContainer}>
            <Image source={waterdropImg} style={styles.tipImage} />

            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === 'android' && (
            <TouchableOpacity
              onPress={handleOpenDateTimePicker}
              style={styles.dateTimePickerButton}
            >
              <Text style={styles.dateTimePickerText}>{`Selecionar ${format(
                selectedDateTime,
                'HH:mm',
              )}`}</Text>
            </TouchableOpacity>
          )}

          <Button text="Cadastrar planta" onPress={handleSavePlant} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },

  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },

  plantDescription: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },

  controls: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },

  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,
  },

  tipImage: {
    width: 56,
    height: 56,
  },

  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },

  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },

  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },

  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
})
