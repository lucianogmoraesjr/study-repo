import { Flex, Box, Text, Image as ChakraImage } from '@chakra-ui/react'
import { Image } from '@chakra-ui/next-js'

interface CityCardProps {
  imageUrl: string
  cityName: string
  country: string
  countryAcronym: string
}

export function CityCard({
  imageUrl,
  cityName,
  country,
  countryAcronym,
}: CityCardProps) {
  return (
    <Box w="64" h="72">
      <Image
        src={imageUrl}
        alt={`Imagem de ${cityName}`}
        width={256}
        height={173}
        borderTopRadius={4}
      />

      <Box
        bg="white"
        borderLeft="1px"
        borderLeftColor="rgba(255, 186, 8, 0.5)"
        borderBottom="1px"
        borderBottomColor="rgba(255, 186, 8, 0.5)"
        borderRight="1px"
        borderRightColor="rgba(255, 186, 8, 0.5)"
        borderRadius={4}
        px="6"
        pb="6"
        pt="1.125rem"
      >
        <Flex align="center" justify="space-between">
          <Box>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              color="gray.600"
              lineHeight="base"
            >
              {cityName}
            </Text>
            <Text mt="3" fontWeight="medium" color="gray.500">
              {country}
            </Text>
          </Box>

          <ChakraImage
            src={`https://flagsapi.com/${countryAcronym}/flat/64.png`}
            alt={`Bandeira do ${country}`}
            boxSize={30}
            objectFit="none"
            borderRadius="full"
          />
        </Flex>
      </Box>
    </Box>
  )
}
