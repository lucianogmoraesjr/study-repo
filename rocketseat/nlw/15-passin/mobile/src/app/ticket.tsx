import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button } from '@/components/button'
import { Credential } from '@/components/credential'
import { Header } from '@/components/header'
import { colors } from '@/styles/colors'

import { QRCode } from '@/components/qrcode'
import { useBadgeStore } from '@/store/badge-store'
import * as ImagePicker from 'expo-image-picker'
import { Redirect } from 'expo-router'

export default function Ticket() {
  const [showQRCode, setShowQRCode] = useState(false)

  const { data, remove, updateImage } = useBadgeStore()

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })

      if (result.assets) {
        updateImage(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Avatar', 'Não foi possível selecionar a imagem.')
    }
  }

  function handleShowQRCode() {
    setShowQRCode(true)
  }

  async function handleShare() {
    try {
      if (data?.checkInURL) {
        await Share.share({
          message: data.checkInURL,
        })
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Compartilhar', 'Não foi possível compartilhar.')
    }
  }

  if (!data) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1 bg-green-500">
      <Header title="Minha credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          onChangeAvatar={handleSelectImage}
          onShowQRCode={handleShowQRCode}
          badge={data}
        />

        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do {data.eventTitle}!
        </Text>

        <Button title="Compartilhar" onPress={handleShare} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10"
          onPress={remove}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showQRCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 bg-green-500 items-center justify-center">
          <QRCode size={300} value="123" />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowQRCode(false)}
            className="mt-10"
          >
            <Text className="text-base text-orange-500 font-bold text-center">
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
