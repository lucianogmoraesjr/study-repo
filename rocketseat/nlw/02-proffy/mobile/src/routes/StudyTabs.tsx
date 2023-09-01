import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { TeacherList } from "../pages/TeacherList";
import { Favorites } from "../pages/Favorites";

const { Navigator, Screen } = createBottomTabNavigator();

export function StudyTabs() {
  return (
    <Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabBarItemStyle: {  
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        tabBarLabelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        tabBarInactiveBackgroundColor: '#fafafc',
        tabBarActiveBackgroundColor: '#ebebf5',
        tabBarInactiveTintColor: '#c1bccc',
        tabBarActiveTintColor: '#32264d'
      }}
    >
      <Screen 
        name='TeacherList' 
        component={TeacherList} 
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons name="ios-easel-outline" size={size} color={focused ? '#8257e5' : color} />
            )
          }
        }}
      />

      <Screen 
        name='Favorites' 
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons name="ios-heart-outline" size={size} color={focused ? '#8257e5' : color} />
            )
          }
        }} 
      />
    </Navigator>
  )
}