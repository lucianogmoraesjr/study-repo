import { useState } from 'react'
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import colors from 'tailwindcss/colors'
import { api } from '../lib/api'

const weekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewHabit() {
  const [title, setTitle] = useState('')
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([])

  function handleToggleWeekday(weekdayIndex: number) {
    if (selectedWeekdays.includes(weekdayIndex)) {
      setSelectedWeekdays((prevState) =>
        prevState.filter((selectedWeekday) => selectedWeekday !== weekdayIndex),
      )
    } else {
      setSelectedWeekdays((prevState) => [...prevState, weekdayIndex])
    }
  }

  async function handleSubmit() {
    try {
      if (!title.trim() || selectedWeekdays.length === 0) {
        return Alert.alert(
          'Novo hábito',
          'Informe o título do hábito e selecione a recorrência.',
        )
      }

      await api.post('habits', {
        title,
        weekDays: selectedWeekdays,
      })

      setTitle('')
      setSelectedWeekdays([])

      Alert.alert('Novo hábito', 'Hábito criado com sucesso! 🎉')
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível criar o novo hábito.')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 border-2 border-zinc-800 text-white focus:border-2 focus:border-green-500"
          placeholder="ex.: Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text
          className="font-semibold
         mt-4 mb-3 text-white text-base"
        >
          Qual a recorrência?
        </Text>

        {weekdays.map((weekday, index) => (
          <Checkbox
            key={weekday}
            title={weekday}
            checked={selectedWeekdays.includes(index)}
            onPress={() => handleToggleWeekday(index)}
          />
        ))}

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          onPress={handleSubmit}
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
