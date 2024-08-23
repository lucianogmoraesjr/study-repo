import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { Alert, Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api } from '@/lib/api'
import { useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'
import { isAxiosError } from 'axios'
import { Link, router } from 'expo-router'
import { useState } from 'react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { save } = useBadgeStore()

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert('Inscrição', 'Preencha todos os campos.')
      }

      setIsLoading(true)

      const {
        data: { attendeeId },
      } = await api.post<{ attendeeId: number }>(
        '/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees',
        {
          name,
          email,
        },
      )

      const { data } = await api.get(`/attendees/${attendeeId}/badge`)

      save(data.badge)

      Alert.alert('Inscrição', 'Inscrição realizada com sucesso!', [
        { text: 'Ok', onPress: () => router.push('/ticket') },
      ])
    } catch (error) {
      console.log(error)

      if (isAxiosError(error)) {
        console.log(error.response?.data.message)
      }

      Alert.alert('Inscrição', 'Erro ao realizar a inscrição.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-green-500 p-8">
      <StatusBar barStyle="light-content" />

      <Image
        source={require('@/assets/logo.png')}
        className="h-16"
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <FontAwesome6 name="user-circle" size={20} color={colors.gray[200]} />

          <Input.Field placeholder="Nome completo" onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.gray[200]}
          />

          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button
          title="Realizar inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
          disabled={isLoading}
        />

        <Link
          href="/"
          className="mt-8 text-gray-100 text-base font-bold text-center"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}
