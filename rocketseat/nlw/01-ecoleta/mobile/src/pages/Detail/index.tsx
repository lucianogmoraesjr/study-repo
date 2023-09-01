import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { Image, TouchableOpacity, Text, View, SafeAreaView, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as MailCompose from 'expo-mail-composer';

import api from '../../services/api';

import styles from './styles';

interface Params {
  point_id: number;
}
interface Data {
  point: {
    image: string,
    image_url: string,
    name: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string
  },
  items: {
    title: string
  }[]
}

export function Detail() {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  };

  function handleComposeMail() {
    MailCompose.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  }

  function handleWhatsApp() {
    Linking.openURL(`https://wa.me/${data.point.whatsapp}/?Tenho+interesse+sobre+coleta+de+res%c3%adduos`);
  };

  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' size={20} color='#34cb79' />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{ uri: data.point.image_url }} />

        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => { }}>
          <FontAwesome name='whatsapp' size={20} color='#fff' />
          <Text style={styles.buttonText} onPress={handleWhatsApp}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => { }}>
          <Icon name='mail' size={20} color='#fff' />
          <Text style={styles.buttonText} onPress={handleComposeMail}>Email</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};