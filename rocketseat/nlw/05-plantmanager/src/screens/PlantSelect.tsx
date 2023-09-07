import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { EnvironmentButton } from '../components/EnvironmentButton'
import { Header } from '../components/Header'

import { api } from '../services/api'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'
import { Plant } from '../libs/storage'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface PlantsEnvironments {
  key: string
  title: string
}

export function PlantSelect() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [selectedEnvironment, setSelectedEnvironment] = useState('all')
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [plantsEnvironments, setPlantsEnvironments] = useState<
    PlantsEnvironments[]
  >([])

  const navigation = useNavigation()

  async function getPlants() {
    try {
      const { data } = await api.get('plants', {
        params: {
          _sort: 'name',
          _order: 'asc',
          _page: page,
          _limit: 8,
        },
      })

      if (!data) return setIsLoading(true)

      if (page > 1) {
        setPlants((prevState) => [...prevState, ...data])
        setFilteredPlants((prevState) => [...prevState, ...data])
      } else {
        setPlants(data)
        setFilteredPlants(data)
      }

      setIsLoading(false)
      setLoadingMore(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getPlantsEnvironments() {
      const { data } = await api.get('plants_environments', {
        params: {
          _sort: 'title',
          _order: 'asc',
        },
      })

      setPlantsEnvironments([{ key: 'all', title: 'Todos' }, ...data])
    }

    getPlantsEnvironments()
  }, [])

  useEffect(() => {
    getPlants()
  }, [])

  function handleSelectEnvironment(environment: string) {
    setSelectedEnvironment(environment)

    if (environment === 'all') {
      setFilteredPlants(plants)
      return
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment),
    )

    setFilteredPlants(filtered)
  }

  function handleGetMore(distance: number) {
    if (distance < 1) return

    setLoadingMore(true)
    setPage((prevState) => prevState + 1)
    getPlants()
  }

  if (isLoading) {
    return <Load />
  }

  function handleSelectPlant(plant: Plant) {
    navigation.navigate('SavePlant', plant)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={plantsEnvironments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === selectedEnvironment}
              onPress={() => handleSelectEnvironment(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={selectedEnvironment === 'all' ? plants : filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handleSelectPlant(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleGetMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 32,
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },

  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingHorizontal: 32,
    marginVertical: 32,
  },

  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
})
