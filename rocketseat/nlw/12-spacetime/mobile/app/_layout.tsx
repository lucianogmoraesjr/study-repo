import { SplashScreen } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { Stack } from 'expo-router/stack'
import { styled } from 'nativewind'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import bgBlur from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

const StyledStrypes = styled(Stripes)

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    undefined | boolean
  >(undefined)

  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) =>
      setIsUserAuthenticated(!!token),
    )
  }, [])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <ImageBackground
      source={bgBlur}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStrypes className="absolute left-2" />
      <StatusBar style="light" backgroundColor="transparent" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
