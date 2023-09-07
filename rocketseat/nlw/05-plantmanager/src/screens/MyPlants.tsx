import { useEffect, useState } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Header } from '../components/Header'
import { Plant, PlantsStoraged, getPlant, removePlant } from '../libs/storage'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'

import waterfrop from '../assets/waterdrop.png'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantsStoraged[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatered, setNextWatered] = useState<string>()

  useEffect(() => {
    ;(async () => {
      const plantsStoraged = await getPlant()

      if (plantsStoraged) {
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: ptBR },
        )

        setNextWatered(
          `Não esqueça de regar a ${plantsStoraged[0].name} em ${nextTime}`,
        )

        setMyPlants(plantsStoraged)
        setLoading(false)
      }
    })()
  }, [])

  function handleRemove(plant: Plant) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel',
      },
      {
        text: 'Sim 😥',
        onPress: async () => {
          try {
            await removePlant(plant.id)

            setMyPlants((prevState) =>
              prevState.filter((item) => item.id !== plant.id),
            )
          } catch {
            Alert.alert('Não foi possível remover! 😥')
          }
        },
      },
    ])
  }

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterfrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    justifyContent: 'space-between',
  },

  spotlightImage: {
    width: 60,
    height: 60,
  },

  spotlightText: {
    flex: 1,
    color: colors.blue,
    textAlign: 'justify',
  },

  plants: {
    flex: 1,
    width: '100%',
  },

  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
})
