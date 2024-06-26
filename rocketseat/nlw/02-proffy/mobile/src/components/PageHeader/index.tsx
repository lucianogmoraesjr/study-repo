import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ReactNode } from "react";
import { Image, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'

import { styles } from "./styles";

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({ title, headerRight, children }: PageHeaderProps) {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode='contain' />
        </BorderlessButton>

        <Image source={logoImg} resizeMode='contain' />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      {children}
    </View>
  )
}