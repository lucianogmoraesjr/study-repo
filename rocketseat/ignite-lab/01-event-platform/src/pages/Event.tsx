import { useParams } from 'react-router-dom'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Video } from '../components/Video'

export function Event() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      <Header />

      <main className="flex flex-1">
        {slug ? (
          <Video lessonSlug={slug} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl text-gray-300">Selecione uma aula ao lado</p>
          </div>
        )}
        <Sidebar />
      </main>
    </div>
  )
}
