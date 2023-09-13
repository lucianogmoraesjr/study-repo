import { useEffect, useState } from 'react'
import { FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png'

import { Header } from '../../components/Header'
import { GameCard } from '../../components/GameCard'

import { styles } from './styles'
import { Background } from '../../components/Background'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

export function Home() {
  const [games, setGames] = useState<Game[]>([])

  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      const response = await fetch('http://192.168.1.125:3333/games')
      const data = await response.json()

      setGames(data)
    })()
  })

  function handleOpenGame({ id, title, bannerUrl }: Game) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Header
          title="Encontre o seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard game={item} onPress={() => handleOpenGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  )
}
