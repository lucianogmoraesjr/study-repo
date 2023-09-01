import React, { useEffect, useState } from "react";
import { Image, Text, View, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import logo from '../../assets/logo.png';
import background from '../../assets/home-background.png'

import styles from './styles';
import axios from "axios";


interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

export function Home() {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');


  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials.sort());
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames.sort());
      });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={background}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={logo} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.picker}>
            <Picker
              style={styles.inputPicker}
              dropdownIconColor="#9E9E9E"
              selectedValue={selectedUf}
              onValueChange={(itemValue) => setSelectedUf(itemValue)}
            >
              <Picker.Item label="Selecione a UF" enabled={false} />
              {ufs.map(uf => (
                <Picker.Item key={uf} label={uf} value={uf} />
              ))}
            </Picker>
          </View>

          <View style={styles.picker}>
            <Picker
              style={styles.inputPicker}
              dropdownIconColor="#9E9E9E"
              selectedValue={selectedCity}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
            >
              <Picker.Item label="Selecione a cidade" enabled={false} />
              {cities.map(city => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
            </Picker>
          </View>

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};