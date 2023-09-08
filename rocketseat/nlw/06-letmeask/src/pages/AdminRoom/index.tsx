import { useParams, useHistory } from 'react-router-dom'
import { ref, remove, update } from 'firebase/database'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'

import { database } from '../../services/firebase'
import { useRoom } from '../../hooks/useRoom'

import './styles.scss'

interface RoomParams {
  id: string
}

export function AdminRoom() {
  const { id: roomId } = useParams<RoomParams>()
  const { roomTitle, questions } = useRoom(roomId)
  const history = useHistory()

  async function handleEndRoom() {
    const roomRef = ref(database, `rooms/${roomId}`)

    await update(roomRef, { endedAt: new Date() })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      const questionRef = ref(
        database,
        `rooms/${roomId}/questions/${questionId}`,
      )

      await remove(questionRef)
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`)

    await update(questionRef, { isAnswered: true })
  }

  async function handleHighlightQuestion(questionId: string) {
    const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`)

    await update(questionRef, { isHighlighted: true })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo de Letmeask" />

          <div>
            <RoomCode roomCode={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {roomTitle}</h1>
          {questions.length > 0 && (
            <span>{`${questions.length} ${
              questions.length === 1 ? 'pergunta' : 'perguntas'
            }`}</span>
          )}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Destacar pergunta" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  )
}
