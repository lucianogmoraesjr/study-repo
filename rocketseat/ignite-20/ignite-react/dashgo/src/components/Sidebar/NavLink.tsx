import { ElementType } from 'react'
import { Icon, Text } from '@chakra-ui/react'
import { ActiveLink } from '../ActiveLink'
import { LinkProps } from '@chakra-ui/next-js'

interface NavLinkProps extends LinkProps {
  icon: ElementType
  children: string
  href: string
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} display="flex" alignItems="center" {...rest}>
      <>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </>
    </ActiveLink>
  )
}
