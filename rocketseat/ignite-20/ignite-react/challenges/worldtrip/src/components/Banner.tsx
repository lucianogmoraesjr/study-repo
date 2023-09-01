import { Flex, Heading, Text, Box, useBreakpointValue } from '@chakra-ui/react'
import { Image } from '@chakra-ui/next-js'

export function Banner() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box h={['163px', '335px']}>
      <Flex
        w="100%"
        h="100%"
        bgImage="url('/background.png')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        align="center"
        justifyContent="space-between"
        px={['4', '8.75rem']}
      >
        <Box maxW={524}>
          <Heading
            color="gray.50"
            fontSize={['xl', '4xl']}
            fontWeight="medium"
            whiteSpace="pre-line"
          >
            6 Continentes, {'\n'} infinitas possibilidades.
          </Heading>
          <Text color="gray.100" fontSize={['sm', 'xl']} mt={['2', '5']}>
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.{' '}
          </Text>
        </Box>

        {isWideVersion && (
          <Image
            src="/airplane.svg"
            width={418}
            height={271}
            alt="Imagem de avião"
            mb="-130px"
          />
        )}
      </Flex>
    </Box>
  )
}
