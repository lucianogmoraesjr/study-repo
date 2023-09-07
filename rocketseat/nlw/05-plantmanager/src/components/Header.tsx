import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../../styles/colors'
import userImg from '../assets/user.png'
import fonts from '../../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Header() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    ;(async () => {
      const name = await AsyncStorage.getItem('@plantmanager:user')

      if (name) {
        setUserName(name)
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetings}>Olá,</Text>
        <Text style={styles.username}>{userName}</Text>
      </View>

      <Image source={userImg} style={styles.avatar} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },

  greetings: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading,
  },

  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
})
