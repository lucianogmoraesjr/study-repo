import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import { PlantSelect } from '../screens/PlantSelect'

import colors from '../../styles/colors'
import { MyPlants } from '../screens/MyPlants'

const { Navigator, Screen } = createBottomTabNavigator()

export function AuthRoutes() {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          height: 80,
        },
      }}
    >
      <Screen
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Navigator>
  )
}
