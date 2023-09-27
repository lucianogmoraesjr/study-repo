import React, { useEffect, useState } from 'react'
import { HStack, ScrollView, Text, VStack, useTheme } from 'native-base'
import { Header } from '../components/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { firestore } from '../lib/firebaseConfig'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Loading } from '../components/Loading'
import {
  CircleWavyCheck,
  ClipboardText,
  DesktopTower,
  Hourglass,
} from 'phosphor-react-native'
import { CardDetails } from '../components/CardDetails'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from 'react-native'

interface RouteParams {
  orderId: string
}

interface Order {
  id: string
  patrimony: string
  description: string
  when: string
  closed: string
  status: 'open' | 'closed'
  solution: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<Order>({} as Order)
  const [solution, setSolution] = useState('')

  const route = useRoute()
  const { colors } = useTheme()
  const navigation = useNavigation()

  const { orderId } = route.params as RouteParams

  useEffect(() => {
    ;(async () => {
      const docRef = doc(firestore, 'orders', orderId)

      const response = await getDoc(docRef)

      const {
        patrimony,
        description,
        status,
        created_at,
        closed_at,
        solution,
      } = response.data()

      const closed = closed_at ? dateFormat(closed_at) : null

      setOrder({
        id: response.id,
        patrimony,
        description,
        status,
        when: dateFormat(created_at),
        closed,
        solution,
      })

      setIsLoading(false)
    })()
  }, [orderId])

  function handleCloseOrder() {
    if (!solution) {
      return Alert.alert(
        'Solicitação',
        'Informe a solução para encerrar a solicitação.',
      )
    }

    const docRef = doc(firestore, 'orders', orderId)

    updateDoc(docRef, {
      status: 'closed',
      solution,
      closed_at: serverTimestamp(),
    })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada.')
        navigation.goBack()
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Solicitação', 'Erro ao encerrar solicitação.')
      })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>

      <ScrollView
        mx={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={order.when}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {!order.solution && (
            <Input
              placeholder="Descrição da solução"
              h={24}
              textAlignVertical="top"
              multiline
              onChangeText={setSolution}
            />
          )}
        </CardDetails>

        {order.status === 'open' && (
          <Button
            title="Encerrar solicitação"
            mt={6}
            onPress={handleCloseOrder}
          />
        )}
      </ScrollView>
    </VStack>
  )
}
