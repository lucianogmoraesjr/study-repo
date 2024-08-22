import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Slot } from 'expo-router'

import { Loader } from '@/components/loader'

import '@/styles/global.css'

export default function Layout() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  if (!isFontsLoaded) {
    return <Loader />
  }

  return <Slot />
}
