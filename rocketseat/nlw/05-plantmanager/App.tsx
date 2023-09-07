import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost'

import * as Notifications from 'expo-notifications'

import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  })

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  })

  if (!fontsLoaded && !fontError) {
    return null
  }
  return <Routes />
}
