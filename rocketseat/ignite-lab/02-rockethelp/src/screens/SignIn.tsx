import { useState } from 'react'
import { Alert } from 'react-native'
import { Heading, Icon, VStack, useTheme } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'

import Logo from '../assets/logo_primary.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

import { auth } from '../lib/firebaseConfig'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { colors } = useTheme()

  async function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha.')
    }

    signInWithEmailAndPassword(auth, email, password)
      .then()
      .catch((error) => {
        console.log(error)

        if (error.code === 'auth/invalid-login-credentials') {
          return Alert.alert('Entrar', 'E-mail ou senha inválida.')
        }

        return Alert.alert('Erro', 'Não foi possível fazer login.')
      })
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        placeholder="E-mail"
        mb={4}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" w="full" mt={8} onPress={handleSignIn} />
    </VStack>
  )
}
