import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { api } from '@/services/api'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import { usePlayer } from '@/contexts/PlayerContext'

import styles from './home.module.scss'

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

interface HomeProps {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer()

  const episodesList = [...latestEpisodes, ...allEpisodes]

  return (
    <div className={styles.homePage}>
      <Head>
        <title>Podcastr</title>
      </Head>

      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((latestEpisode, index) => (
            <li key={latestEpisode.id}>
              <Image
                width={192}
                height={192}
                src={latestEpisode.thumbnail}
                alt={latestEpisode.title}
                style={{ objectFit: 'cover' }}
              />

              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${latestEpisode.id}`}>
                  {latestEpisode.title}
                </Link>
                <p>{latestEpisode.members}</p>
                <span>{latestEpisode.publishedAt}</span>
                <span>{latestEpisode.durationAsString}</span>
              </div>

              <button type="button">
                <img
                  src="/play-green.svg"
                  alt="Botão de tocar"
                  onClick={() => playList(episodesList, index)}
                />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => (
              <tr key={episode.id}>
                <td>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    style={{ objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      playList(episodesList, index + latestEpisodes.length)
                    }
                  >
                    <img src="/play-green.svg" alt="Botão de tocar" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = data.map((episode: any) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration),
      ),
      description: episode.description,
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
