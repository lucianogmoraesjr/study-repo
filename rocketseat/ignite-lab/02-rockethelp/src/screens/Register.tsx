import { useState } from 'react'
import { VStack } from 'native-base'
import { Alert } from 'react-native'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

import { firestore } from '../lib/firebaseConfig'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleNewRegistry() {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos.')
    }

    setIsLoading(true)

    addDoc(collection(firestore, 'orders'), {
      patrimony,
      description,
      status: 'open',
      created_at: serverTimestamp(),
    })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
        navigation.goBack()
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        Alert.alert('Erro', 'Não foi possível registrar.')
      })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        textAlignVertical="top"
        multiline
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewRegistry}
      />
    </VStack>
  )
}
