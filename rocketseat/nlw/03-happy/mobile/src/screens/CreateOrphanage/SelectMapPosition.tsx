import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import * as Location from 'expo-location'

import mapMarkerImg from '../../assets/images/map-marker.png';

export default function SelectMapPosition() {
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 })
  const [position, setPosition]= useState({ latitude: 0, longitude: 0 })

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        alert('Eita, precisamos da sua permissão para obter sua localização.')
        return
      }

      const { coords } = await Location.getCurrentPositionAsync({})

      setCurrentLocation({ latitude: coords.latitude, longitude: coords.longitude })
    })()
  }, [])

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(event: MapPressEvent) {
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      {currentLocation.latitude === 0 ? (
        <View><Text>Carregando</Text></View>
      ) : (
        <MapView 
          initialRegion={{
            latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          {position.latitude !== 0 && (
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ latitude: position.latitude, longitude: position.longitude }}
            />
          )}
        </MapView>
      )}
      
      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})