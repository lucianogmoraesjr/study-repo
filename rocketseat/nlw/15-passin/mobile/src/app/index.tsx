import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, Redirect } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api } from '@/lib/api'
import { useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'

export default function App() {
  const [ticketCode, setTicketCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()

  async function handleAccessCredential() {
    try {
      if (!ticketCode.trim()) {
        return Alert.alert('Ingresso', 'Informe o código do ingresso!')
      }

      setIsLoading(true)

      const { data } = await api.get(`/attendees/${ticketCode}/badge`)

      badgeStore.save(data.badge)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      Alert.alert('Ingresso', 'Erro ao acessar credencial.')
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />
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
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.gray[200]}
          />

          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setTicketCode}
          />
        </Input>

        <Button
          title="Acessar credencial"
          onPress={handleAccessCredential}
          isLoading={isLoading}
          disabled={isLoading}
        />

        <Link
          href="/register"
          className="mt-8 text-gray-100 text-base font-bold text-center"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}
