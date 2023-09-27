import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import {
  Center,
  FlatList,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

import Logo from '../assets/logo_secondary.svg'
import { Filter } from '../components/Filter'
import { Order, OrderData } from '../components/Order'
import { Button } from '../components/Button'
import { auth, firestore } from '../lib/firebaseConfig'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Loading } from '../components/Loading'

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open',
  )
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<OrderData[]>([])
  const [ordersCount, setOrdersCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)

    const ordersRef = collection(firestore, 'orders')

    const getOrdersQuery = query(
      ordersRef,
      where('status', '==', statusSelected),
    )

    const unsubscribe = onSnapshot(getOrdersQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const { patrimony, description, status, created_at } = doc.data()

        return {
          id: doc.id,
          patrimony,
          description,
          status,
          when: dateFormat(created_at),
        }
      })

      if (statusSelected === 'open') {
        setOrdersCount(data.length)
      }

      setOrders(data)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [statusSelected])

  const { colors } = useTheme()
  const navigation = useNavigation()

  function handleSignOut() {
    auth.signOut().catch((error) => {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível sair.')
    })
  }

  function handleNavigateToRegister() {
    navigation.navigate('new')
  }

  function handlePatrimonyDetails(id: string) {
    navigation.navigate('details', {
      orderId: id,
    })
  }

  return (
    <VStack flex={1} paddingBottom={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleSignOut}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Meus chamados</Heading>
          <Text color="gray.200">{ordersCount}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title="em andamento"
            type="open"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            title="fechados"
            type="closed"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order
                data={item}
                onPress={() => handlePatrimonyDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui{'\n'}
                  solicitações{' '}
                  {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="Nova solicitação" onPress={handleNavigateToRegister} />
      </VStack>
    </VStack>
  )
}
