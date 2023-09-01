import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { ReactNode, cloneElement } from "react"

interface ActiveLinkProps extends LinkProps {
  children: ReactNode
  activeClassName: string
}

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter()

  const urlPostSlugRegexPattern = /^\/posts\/(.*)/

  const isPostUrl = urlPostSlugRegexPattern.test(asPath)

  const href = rest.href.toString()

  const isHrefEqualToPostUrl = href.startsWith("/posts") && isPostUrl

  const className =
    asPath === rest.href || isHrefEqualToPostUrl ? activeClassName : ""

  return (
    <Link {...rest} className={className}>
      {children}
    </Link>
  )
}
