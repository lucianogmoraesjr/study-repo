import { Image, Link } from '@chakra-ui/next-js'
import { Box, Heading, Text } from '@chakra-ui/react'

interface CarouselItemProps {
  imageUrl: string
  name: string
  caption?: string
  path?: string
}

export function CarouselItem({
  imageUrl,
  name,
  caption,
  path = '',
}: CarouselItemProps) {
  return (
    <Link href={path}>
      <Image
        src={imageUrl}
        alt={`Imagem de ${name}`}
        width={1240}
        height={450}
        objectFit="cover"
        objectPosition="center"
        filter="auto"
        brightness="35%"
        position="relative"
      />

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading fontSize={['2xl', '5xl']} color="gray.50">
          {name}
        </Heading>
        <Text fontSize={['sm', '2xl']} color="gray.50" fontWeight="bold" mt="4">
          {caption}
        </Text>
      </Box>
    </Link>
  )
}
