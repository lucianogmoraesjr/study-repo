import React from 'react'
import {
  Box,
  Circle,
  HStack,
  IPressableProps,
  Pressable,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
} from 'phosphor-react-native'

export interface OrderData {
  id: string
  patrimony: string
  when: string
  status: 'open' | 'closed'
}

type OrderProps = IPressableProps & {
  data: OrderData
}

export function Order({ data, ...props }: OrderProps) {
  const { colors } = useTheme()

  const colorType =
    data.status === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <Pressable {...props}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={colorType} />

        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md">
            Patrimônio {data.patrimony}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.500" h={12} w={12} mr={5}>
          {data.status === 'closed' ? (
            <CircleWavyCheck size={24} color={colorType} />
          ) : (
            <Hourglass size={24} color={colorType} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  )
}
