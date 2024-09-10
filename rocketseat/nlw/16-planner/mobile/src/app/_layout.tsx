import { Loader } from '@/components/loader'
import '@/styles/global.css'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from '@expo-google-fonts/inter'

import { Slot } from 'expo-router'
import { StatusBar, View } from 'react-native'

export default function Layout() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  })

  if (!loaded) {
    return <Loader />
  }

  return (
    <View className="flex-1 bg-zinc-950">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Slot />
    </View>
  )
}
