import { useEffect, useState } from 'react'
import { Clock, CalendarBlank } from '@phosphor-icons/react'
import axios from 'axios'

import { Movie } from '../../App'

import starImg from '../../assets/star.svg'
import playImg from '../../assets/play.svg'

import './styles.scss'

interface MovieCardProps {
  movie: Movie
}

interface MovieVideo {
  results: Array<{
    key: string
    type: string
  }>
}

export function MovieCard({ movie }: MovieCardProps) {
  const [runtime, setRuntime] = useState(0)
  const [movieTrailer, setMovieTrailer] = useState<string | undefined>('')

  useEffect(() => {
    async function getMovieRuntime(movieId: number) {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          },
        )

        setRuntime(data.runtime)
      } catch (error) {
        console.log(error)
      }
    }

    getMovieRuntime(movie.id)
  }, [movie.id])

  useEffect(() => {
    async function getMovieTrailer(movieId: number) {
      try {
        const { data } = await axios.get<MovieVideo>(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          },
        )

        const trailer = data.results.find((video) => video.type === 'Trailer')
          ?.key

        setMovieTrailer(trailer)
      } catch (error) {
        console.log(error)
      }
    }

    getMovieTrailer(movie.id)
  }, [movie.id])

  function formatRuntime(runtime: number) {
    const date = new Date(0)

    date.setMinutes(runtime)

    return date.toISOString().slice(11, 19)
  }

  function handleShowTrailer(movieTrailer: string | undefined) {
    if (!movieTrailer) return

    window.open(`https://youtube.com/watch?v=${movieTrailer}`, 'blank')
  }

  return (
    <div className="movie">
      <div className="title">
        <span>{movie.title}</span>

        <div className="rating">
          <img src={starImg} alt="Estrela" />

          <p>{movie.vote_average}</p>
        </div>
      </div>

      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`Poster de ${movie.title}`}
        />
      </div>

      <div className="info">
        <div className="length">
          <Clock />
          <span>{formatRuntime(runtime)}</span>
        </div>

        <div className="release-year">
          <CalendarBlank />
          <span>{movie.release_date.slice(0, 4)}</span>
        </div>
      </div>

      <button onClick={() => handleShowTrailer(movieTrailer)}>
        <div className="icon-wrapper dark">
          <img src={playImg} alt="Play" />
        </div>
        Assistir trailer
      </button>
    </div>
  )
}
