import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/next-js'

import { Carousel } from '@/components/Carousel'
import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'
import { Divider } from '@/components/Divider'

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box maxW="1440px" mx="auto" pb="10">
      <Header />

      <Banner />

      {isWideVersion && (
        <Flex mt="20" px="8.75rem" align="center" justify="space-between">
          <Flex direction="column" align="center" w="158px">
            <Image
              src="/assets/cocktail.svg"
              width={85}
              height={85}
              alt="Imagem de um coquetel"
            />
            <Text mt="6" fontSize="2xl" fontWeight="semibold" color="gray.600">
              vida noturna
            </Text>
          </Flex>

          <Flex direction="column" align="center" w="158px">
            <Image
              src="/assets/surf.svg"
              width={85}
              height={85}
              alt="Imagem de uma prancha"
            />
            <Text mt="6" fontSize="2xl" fontWeight="semibold" color="gray.600">
              praia
            </Text>
          </Flex>

          <Flex direction="column" align="center" w="158px">
            <Image
              src="/assets/building.svg"
              width={85}
              height={85}
              alt="Imagem de um edifício"
            />
            <Text mt="6" fontSize="2xl" fontWeight="semibold" color="gray.600">
              moderno
            </Text>
          </Flex>

          <Flex direction="column" align="center" w="158px">
            <Image
              src="/assets/museum.svg"
              width={85}
              height={85}
              alt="Imagem de um museu"
            />
            <Text mt="6" fontSize="2xl" fontWeight="semibold" color="gray.600">
              clássico
            </Text>
          </Flex>

          <Flex direction="column" align="center" w="158px">
            <Image
              src="/assets/earth.svg"
              width={85}
              height={85}
              alt="Imagem do planeta Terra"
            />
            <Text mt="6" fontSize="2xl" fontWeight="semibold" color="gray.600">
              e mais...
            </Text>
          </Flex>
        </Flex>
      )}

      {!isWideVersion && (
        <Grid
          mt="9"
          templateColumns="repeat(2, 1fr)"
          justifyItems="center"
          gap={6}
          px="10"
        >
          <GridItem w="136px">
            <Flex
              flex="1"
              direction="column"
              justifyContent="space-between"
              gap={6}
            >
              <Flex>
                <Text mr="2" color="yellow.400">
                  &#x25cf;
                </Text>
                <Text fontWeight="medium">vida noturna</Text>
              </Flex>
              <Flex>
                <Text mr="2" color="yellow.400">
                  &#x25cf;
                </Text>
                <Text fontWeight="medium">moderno</Text>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem w="136px" display="flex">
            <Flex
              flex="1"
              direction="column"
              justifyContent="space-between"
              alignItems="end"
              gap="6"
            >
              <Flex>
                <Text mr="2" color="yellow.400">
                  &#x25cf;
                </Text>
                <Text fontWeight="medium">praia</Text>
              </Flex>
              <Flex>
                <Text mr="2" color="yellow.400">
                  &#x25cf;
                </Text>
                <Text fontWeight="medium">clássico</Text>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem display="flex" colSpan={2}>
            <Text mr="2" color="yellow.400">
              &#x25cf;
            </Text>
            <Text fontWeight="medium">e mais...</Text>
          </GridItem>
        </Grid>
      )}

      <Divider />

      <Flex direction="column" align="center" mt="6">
        <Heading
          fontSize={['xl', '4xl']}
          fontWeight="medium"
          lineHeight="normal"
        >
          Vamos nessa?
        </Heading>
        <Heading
          fontSize={['xl', '4xl']}
          fontWeight="medium"
          lineHeight="normal"
        >
          Então escolha seu continente
        </Heading>
      </Flex>

      <Carousel />
    </Box>
  )
}
