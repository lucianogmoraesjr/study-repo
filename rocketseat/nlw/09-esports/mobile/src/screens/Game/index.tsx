import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import { Background } from '../../components/Background'
import { GameParams } from '../../@types/navigation'

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles'
import { THEME } from '../../theme'
import { Header } from '../../components/Header'
import { Duo, DuoCard } from '../../components/DuoCard'
import { useEffect, useState } from 'react'
import { DuoMatch } from '../../components/DuoMatch'

export function Game() {
  const [duos, setDuos] = useState<Duo[]>([])
  const [duoSelected, setDuoSelected] = useState('')

  const { params } = useRoute()
  const game = params as GameParams

  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      const response = await fetch(
        `http://192.168.1.125:3333/games/${game.id}/ads`,
      )
      const data = await response.json()

      setDuos(data)
    })()
  })

  function handleGoBack() {
    navigation.goBack()
  }

  async function getUserDiscord(adsId: string) {
    const response = await fetch(
      `http://192.168.1.125:3333/ads/${adsId}/discord`,
    )
    const data = await response.json()

    setDuoSelected(data.discord)
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.emptyRight} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Header title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard duo={item} onConnect={() => getUserDiscord(item.id)} />
          )}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          style={styles.containerList}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyList}>
              Não há anúncios para este jogo ainda.
            </Text>
          )}
        />

        <DuoMatch
          visible={duoSelected.length > 0}
          discord={duoSelected}
          onClose={() => setDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  )
}
