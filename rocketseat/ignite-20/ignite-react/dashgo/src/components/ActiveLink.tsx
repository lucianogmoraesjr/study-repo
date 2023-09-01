import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Link, LinkProps } from '@chakra-ui/next-js'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter()

  let isActive = false

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true
  }

  return (
    <Link {...rest} color={isActive ? 'pink.400' : 'gray.50'}>
      {children}
    </Link>
  )
}
