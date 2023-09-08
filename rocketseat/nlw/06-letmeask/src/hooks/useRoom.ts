import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'

import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

interface Question {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [roomTitle, setRoomTitle] = useState<string>()

  const { user } = useAuth()

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`)

    const unsubscribe = onValue(roomRef, (snapshot) => {
      const databaseRoom = snapshot.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([, like]) => like.authorId === user?.id,
            )?.[0],
          }
        },
      )

      setRoomTitle(databaseRoom.title)
      setQuestions(parsedQuestions)

      return () => unsubscribe()
    })
  }, [roomId, user?.id])

  return { questions, roomTitle }
}
