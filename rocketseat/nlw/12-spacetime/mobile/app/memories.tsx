import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import Logo from '../src/assets/logo.svg'
import { api } from '../src/lib/api'

dayjs.locale(ptBR)

interface Memory {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}

export default function NewMemory() {
  const [memories, setMemories] = useState<Memory[]>([])

  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  async function logout() {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  useEffect(() => {
    ;(async () => {
      const token = await SecureStore.getItemAsync('token')

      const response = await api.get('memories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMemories(response.data)
    })()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <Logo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={logout}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View key={memory.id} className="space-y-4">
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </Text>
            </View>
            <View className="space-y-4 px-8">
              <Image
                source={{
                  uri: memory.coverUrl,
                }}
                alt=""
                className="aspect-video w-full rounded-lg"
              />

              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>

              <Link href="/memoried/id" asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
