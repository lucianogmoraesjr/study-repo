import { useEffect, useState } from 'react'
import { Flash } from 'iconsax-react'
import axios from 'axios'

import { MovieCard } from './components/MovieCard'

import logoImg from './assets/logo.svg'

import './App.scss'
import { CircleNotch } from '@phosphor-icons/react'

export interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [randomIndexes, setRandomIndexes] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getMovies() {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          },
        )

        setMovies(data.results)
      } catch (error) {
        console.log(error)
      }
    }

    getMovies()
  }, [])

  function getRandomIndexes(length: number) {
    const indexes: number[] = []

    while (indexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * length)

      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex)
      }
    }

    return indexes
  }

  useEffect(() => {
    if (movies.length > 0) {
      setRandomIndexes(getRandomIndexes(movies.length))
    }
  }, [movies])

  const randomMovies: Movie[] = randomIndexes.map((index) => movies[index])

  function handleGenerateRecommendations() {
    setIsLoading(true)

    setRandomIndexes(getRandomIndexes(movies.length))

    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="container">
      <div className="content">
        <header>
          <img src={logoImg} alt="Movie AI Logo" />

          <button onClick={handleGenerateRecommendations}>
            {isLoading ? (
              <>
                Gerando...
                <div className="icon-wrapper">
                  <CircleNotch weight="bold" className="loading" />
                </div>
              </>
            ) : (
              <>
                Nova recomendação
                <div className="icon-wrapper">
                  <Flash variant="Linear" />
                </div>
              </>
            )}
          </button>
        </header>

        <main className="movies">
          {isLoading ? (
            <CircleNotch weight="bold" className="loading large" />
          ) : (
            randomMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </main>
      </div>
    </div>
  )
}

export default App
