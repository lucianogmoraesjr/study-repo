import Head from "next/head"
import Link from "next/link"
import { GetStaticProps } from "next"
import Prismic from "@prismicio/client"

import { getPrismicClient } from "@/services/prismic"

import styles from "./styles.module.scss"

type Post = {
  slug: string
  title: string
  abstract: string
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

export default function Post({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.abstract}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query<any>([
    Prismic.predicates.at("document.type", "post"),
  ])

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: post.data.title,
      abstract:
        post.data.content.find((content: any) => content.type === "paragraph")
          ?.text ?? "",

      updatedAt: new Date(post.last_publication_date!).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    }
  })

  return {
    props: {
      posts,
    },
  }
}
