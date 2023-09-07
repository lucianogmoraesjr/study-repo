import { createStackNavigator } from '@react-navigation/stack'

import { Welcome } from '../screens/Welcome'
import { UserIdentification } from '../screens/UserIdentification'
import { Confirmation } from '../screens/Confirmation'
import { SavePlant } from '../screens/SavePlant'
import { AuthRoutes } from './tab.routes'

import colors from '../../styles/colors'

const { Navigator, Screen } = createStackNavigator()

export function StackRoutes() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{ cardStyle: { backgroundColor: colors.white } }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="UserIdentification" component={UserIdentification} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="PlantSelect" component={AuthRoutes} />
      <Screen name="SavePlant" component={SavePlant} />
      <Screen name="MyPlants" component={AuthRoutes} />
    </Navigator>
  )
}
