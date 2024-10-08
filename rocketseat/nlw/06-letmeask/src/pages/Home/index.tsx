import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ref, get, child } from 'firebase/database'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'

import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'

import './styles.scss'

export function Home() {
  const [roomCode, setRoomCode] = useState('')
  const { user, signInWithGoogle } = useAuth()
  const history = useHistory()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const dbRef = ref(database)
    const snapshot = await get(child(dbRef, `rooms/${roomCode}`))

    if (!snapshot.exists()) {
      alert('A sala não existe.')
      return
    }

    if (snapshot.val().endedAt) {
      alert('Room already closed.')
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração" />

        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo Letmeask" />

          <button
            type="button"
            className="create-room"
            onClick={handleCreateRoom}
          >
            <img src={googleIconImg} alt="Ícone de Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
