import { useRouter } from "next/router"
import Image from "next/image"

import { SignInButton } from "../SignInButton"
import { ActiveLink } from "../ActiveLink"

import styles from "./styles.module.scss"

export function Header() {
  const { asPath } = useRouter()

  const urlPostSlugRegexPattern = /^\/posts\/(.*)/

  const isPostUrl = urlPostSlugRegexPattern.test(asPath)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="ig.news"
          width={108.45}
          height={30.27}
          priority={true}
        />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            Home
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            Posts
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
