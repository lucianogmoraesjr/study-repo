import { Flex, Avatar, Box, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>John Doe</Text>
          <Text color="gray.300" fontSize="sm">
            john@mail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="John Doe"
        src="https://github.com/lucianogmoraesjr.png"
      />
    </Flex>
  )
}
