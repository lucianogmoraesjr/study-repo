import { useRouter } from 'next/router'
import { Flex, Icon } from '@chakra-ui/react'
import { Image, Link } from '@chakra-ui/next-js'
import { HiChevronLeft } from 'react-icons/hi2'

export function Header() {
  const { asPath } = useRouter()

  const isHomeScreen = asPath === '/'

  return (
    <Flex
      as="header"
      h="20"
      align="center"
      justifyContent="space-between"
      px={['0', '8.75rem']}
    >
      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {!isHomeScreen && (
          <Link
            href="/"
            position="absolute"
            left={['4', '0']}
            transform="translate(-30%, 0)"
            p="0"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Icon as={HiChevronLeft} boxSize={8} color="gray.600" />
          </Link>
        )}

        <Image
          src="/logo.svg"
          width={185}
          height={46}
          alt="Logo de Worldtrip"
        />
      </Flex>
    </Flex>
  )
}
