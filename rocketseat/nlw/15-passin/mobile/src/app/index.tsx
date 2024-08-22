import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Alert, Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { colors } from '@/styles/colors'
import { Link } from 'expo-router'
import { useState } from 'react'

export default function App() {
  const [ticketCode, setTicketCode] = useState('')

  function handleAccessCredential() {
    if (!ticketCode.trim()) {
      return Alert.alert('Ingresso', 'Informe o código do ingresso!')
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

        <Button title="Acessar credencial" onPress={handleAccessCredential} />

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
