import { Box, Divider as ChakraDivider } from '@chakra-ui/react'

export function Divider() {
  return (
    <Box w="100%">
      <ChakraDivider
        mt={['9', '20']}
        mx="auto"
        borderColor="gray.600"
        borderWidth={['1px', '2px', '2px', '2px', '2px']}
        width={['60px', '90px', '90px', '90px', '90px']}
      />
    </Box>
  )
}
