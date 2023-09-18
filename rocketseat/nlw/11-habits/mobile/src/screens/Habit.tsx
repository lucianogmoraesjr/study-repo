import { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { BackButton } from '../components/BackButton'
import { Progress } from '../components/Progress'
import { Checkbox } from '../components/Checkbox'
import { Loading } from '../components/Loading'
import { api } from '../lib/api'
import { HabitsEmpty } from '../components/HabitsEmpty'

interface DayInfo {
  completedHabits: string[]
  possibleHabits: Array<{
    id: string
    title: string
  }>
}

interface HabitParams {
  date: string
}

export function Habit() {
  const [dayInfo, setDayInfo] = useState<DayInfo | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const route = useRoute()
  const { date } = route.params as HabitParams

  const parsedDate = dayjs(date)
  const weekday = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM ')
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

  const habitsProgress = dayInfo?.possibleHabits?.length
    ? Math.round((completedHabits.length * 100) / dayInfo.possibleHabits.length)
    : 0

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)

        const { data } = await api.get('day', {
          params: {
            date,
          },
        })

        setDayInfo(data)
        setCompletedHabits(data.completedHabits ?? [])
      } catch (error) {
        console.log(error)
        Alert.alert(
          'Ops',
          'Não foi possível carregar as informações dos hábitos.',
        )
      } finally {
        setIsLoading(false)
      }
    })()
  }, [date])

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`habits/${habitId}/toggle`)

      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId),
        )
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId])
      }
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Ops',
        'Não foi possível atualizar as informações dos hábitos.',
      )
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {weekday}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <Progress progress={habitsProgress} />

        <View
          className={clsx('mt-6', {
            'opacity-50': isDateInPast,
          })}
        >
          {dayInfo?.possibleHabits ? (
            dayInfo.possibleHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabit(habit.id)}
                disabled={isDateInPast}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>

        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você não editar um hábito de uma data passada.
          </Text>
        )}
      </ScrollView>
    </View>
  )
}
