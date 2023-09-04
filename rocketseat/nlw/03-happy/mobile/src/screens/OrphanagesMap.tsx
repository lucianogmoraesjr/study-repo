import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather } from '@expo/vector-icons'
import { RectButton } from "react-native-gesture-handler";
import * as Location from 'expo-location'

import mapMarker from '../assets/images/map-marker.png'

import { api } from "../services/api";

interface Orphanage {
  id: number
  name: string
  latitude: number
  longitude: number
}

export function OrphanagesMap() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 })
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        alert('Eita, precisamos da sua permissão para obter sua localização.')
        return
      }

      const { coords } = await Location.getCurrentPositionAsync({})

      setLocation({ latitude: coords.latitude, longitude: coords.longitude })
    })()
  }, [])

  useEffect(() => {
    const getOrphanages = async () => {
      const { data } = await api.get('orphanages')
      setOrphanages(data)
    }

    getOrphanages()
  }, [])

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id })
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition', { location })
  }

  return (
    <View style={styles.container}>
      {location.latitude === 0 ? (
        <View><Text>Carregando</Text></View>
      ) : (
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }}>
          
          {orphanages.map(orphanage => (
            <Marker key={orphanage.id} icon={mapMarker} calloutAnchor={{ x: 2.7, y: 0.8 }} coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }} 
            >
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name='plus' size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3
  },

  footerText: {
    color: "#8fa7b3",
    fontFamily: 'Nunito_700Bold'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
