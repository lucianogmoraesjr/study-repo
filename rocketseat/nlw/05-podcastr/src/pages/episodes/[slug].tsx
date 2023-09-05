import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'

import { api } from '@/services/api'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import { usePlayer } from '@/contexts/PlayerContext'

import styles from './episode.module.scss'
import Head from 'next/head'

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  description: string
  duration: number
  durationAsString: string
  url: string
}

interface EpisodeProps {
  episode: Episode
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export default function Episode({ episode }: EpisodeProps) {
  const router = useRouter()
  const { play } = usePlayer()

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title}</title>
      </Head>

      <div className={styles.thumbnailContainer}>
        <button type="button" onClick={() => router.push('/')}>
          <img src="/arrow-left.svg" alt="Voltar" />
        </button>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          style={{ objectFit: 'cover' }}
          alt={episode.title}
        />

        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const paths = data.map((episode: any) => {
    return {
      params: {
        slug: episode.id,
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params

  const { data } = await api.get(`episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24,
  }
}
