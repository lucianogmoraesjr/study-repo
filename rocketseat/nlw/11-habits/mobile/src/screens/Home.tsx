import { useCallback, useEffect, useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { api } from '../lib/api'

import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'
import { HabitDay, daySize } from '../components/HabitDay'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import dayjs from 'dayjs'

interface Summary {
  id: string
  date: string
  amount: number
  completed: number
}

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const datesFromYearStart = generateRangeDatesFromYearStart()
const minimumSummaryDateSize = 18 * 5
const amountOfDaysToFill = minimumSummaryDateSize - datesFromYearStart.length

export function Home() {
  const [summary, setSummary] = useState<Summary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { navigate } = useNavigation()

  async function getSummary() {
    try {
      setIsLoading(true)

      const { data } = await api.get('summary')

      console.log(data)
      setSummary(data)
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleNavigateToHabit(date: string) {
    navigate('habit', { date })
  }

  useFocusEffect(
    useCallback(() => {
      getSummary()
    }, []),
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: daySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            const dayWithHabits = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day')
            })

            return (
              <HabitDay
                date={date}
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
                key={date.toISOString()}
                onPress={() => handleNavigateToHabit(date.toISOString())}
              />
            )
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
                style={{ width: daySize, height: daySize }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}
