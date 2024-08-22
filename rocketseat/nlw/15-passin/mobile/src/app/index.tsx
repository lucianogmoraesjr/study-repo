import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { colors } from '@/styles/colors'
import { Link } from 'expo-router'

export default function App() {
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

          <Input.Field placeholder="Código do ingresso" />
        </Input>

        <Button title="Acessar credencial" />

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
