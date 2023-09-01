import { Image } from '@chakra-ui/next-js'
import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'

import { Header } from '@/components/Header'
import { CityCard } from '@/components/CityCard'

export default function Europe() {
  return (
    <Box maxW="1440px" mx="auto" mb="2.1875rem">
      <Header />

      <Box maxW="1440px" w="full" position="relative">
        <Image
          src="https://images.unsplash.com/photo-1543767011-7d8d624bc8cc"
          alt="Imagem do Big Ben"
          width={1440}
          height={500}
          objectFit="cover"
          objectPosition="center"
          filter="auto"
          brightness="35%"
          w={[375, 1440]}
          h={[150, 500]}
        />

        <Heading
          position="absolute"
          left={['50%', '9.75rem', '8.75rem']}
          bottom={['50%', '3.75rem']}
          transform={['translate(-50%, 50%)', 'translate(0, 0)']}
          fontSize={['1.75rem', '5xl']}
          fontWeight="semibold"
          color="gray.50"
          display="block"
        >
          Europa
        </Heading>
      </Box>

      <Box
        maxW={1160}
        mx="auto"
        mt={['6', '20']}
        px={['4', '4', '4', '4', '0']}
      >
        <Flex
          alignItems="center"
          gap={['4', '4.375rem']}
          direction={['column', 'row']}
        >
          <Box maxW={600}>
            <Text textAlign="justify" fontSize={['sm', '2xl']} color="gray.600">
              A Europa é, por convenção, um dos seis continentes do mundo.
              Compreendendo a península ocidental da Eurásia, a Europa
              geralmente divide-se da Ásia a leste pela divisória de águas dos
              montes Urais, o rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a
              sudeste
            </Text>
          </Box>

          <Flex maxW={490} gap="2.625rem">
            <Flex direction="column" align={['flex-start', 'center']}>
              <Heading
                fontSize={['2xl', '5xl']}
                color="yellow.400"
                fontWeight="semibold"
              >
                50
              </Heading>
              <Heading
                fontSize={['lg', '2xl']}
                color="gray.600"
                fontWeight={['normal', 'semibold']}
              >
                países
              </Heading>
            </Flex>
            <Flex direction="column" align={['flex-start', 'center']}>
              <Heading
                fontSize={['2xl', '5xl']}
                color="yellow.400"
                fontWeight="semibold"
              >
                60
              </Heading>
              <Heading
                fontSize={['lg', '2xl']}
                color="gray.600"
                fontWeight={['normal', 'semibold']}
              >
                línguas
              </Heading>
            </Flex>
            <Flex direction="column" align={['flex-start', 'center']}>
              <Heading
                fontSize={['2xl', '5xl']}
                color="yellow.400"
                fontWeight="semibold"
              >
                27
              </Heading>
              <Heading
                fontSize={['lg', '2xl']}
                color="gray.600"
                fontWeight={['normal', 'semibold']}
              >
                cidades +100{' '}
              </Heading>
            </Flex>
          </Flex>
        </Flex>

        <Heading fontWeight="medium" fontSize="4xl" mt={['8', '20']}>
          Cidades +100
        </Heading>

        <SimpleGrid
          mt={['5', '10']}
          minChildWidth="256px"
          spacing="45px"
          justifyItems={['center', 'inherit']}
        >
          <CityCard
            cityName="Londres"
            country="Reino Unido"
            imageUrl="https://images.unsplash.com/photo-1533929736458-ca588d08c8be"
            countryAcronym="GB"
          />
          <CityCard
            cityName="Paris"
            country="França"
            imageUrl="https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f"
            countryAcronym="FR"
          />

          <CityCard
            cityName="Roma"
            country="Itália"
            imageUrl="https://images.unsplash.com/photo-1552832230-c0197dd311b5"
            countryAcronym="IT"
          />

          <CityCard
            cityName="Praga"
            country="República Tcheca"
            imageUrl="https://images.unsplash.com/photo-1661354786734-9dd3b519cd47"
            countryAcronym="CZ"
          />

          <CityCard
            cityName="Amsterdã"
            country="Holanda"
            imageUrl="https://images.unsplash.com/photo-1534351590666-13e3e96b5017"
            countryAcronym="NL"
          />
        </SimpleGrid>
      </Box>
    </Box>
  )
}
