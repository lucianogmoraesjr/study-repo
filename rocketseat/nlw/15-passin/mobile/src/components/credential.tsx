import { Feather } from '@expo/vector-icons'
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Badge } from '@/store/badge-store'
import { colors } from '@/styles/colors'
import { QRCode } from './qrcode'

interface CredentialProps {
  onChangeAvatar?: () => void
  onShowQRCode?: () => void
  badge: Badge
}

export function Credential({
  onChangeAvatar,
  onShowQRCode,
  badge,
}: CredentialProps) {
  return (
    <View className="w-full self-stretch items-center">
      <Image
        source={require('@/assets/ticket/band.png')}
        className="w-24 h-52 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require('@/assets/ticket/header.png')}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              {badge.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">#123</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {badge.image ? (
          <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.7}>
            <Image
              source={{ uri: badge.image }}
              className="w-36 h-36 rounded-full -mt-[6.2rem]"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            className="size-36 rounded-full bg-gray-400 items-center justify-center -mt-[6.2rem]"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {badge.name}
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">
          {badge.email}
        </Text>

        <QRCode value={badge.checkInURL} size={120} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6"
          onPress={onShowQRCode}
        >
          <Text className="font-bold text-orange-500 text-sm">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
