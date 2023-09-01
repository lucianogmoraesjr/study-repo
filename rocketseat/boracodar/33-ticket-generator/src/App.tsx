import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import html2canvas from 'html2canvas'

import ticketCover from './assets/cover-ticket.png'
import avatarImg from './assets/avatar.png'
import githubLogo from './assets/github.svg'
import linesImg from './assets/lines.svg'

import './App.scss'

interface User {
  name: string
  avatar_url: string
}

function App() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [success, setSuccess] = useState(false)

  const ticketRef = useRef<HTMLDivElement>(null)

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)

    if (username === '') {
      setIsError(false)
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsLoading(true)

    if (username === '') {
      setIsError(true)
      setIsLoading(false)
      return
    }

    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()

    if (data.message === 'Not Found') {
      setIsError(true)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setUser(data)
    setSuccess(true)
  }

  function downloadTicket() {
    if (ticketRef.current === null) {
      return
    }

    html2canvas(ticketRef.current, { allowTaint: true, useCORS: true })
      .then((canvas) => {
        const link = document.createElement('a')
        link.download = 'ticket.jpeg'
        link.href = canvas.toDataURL('image/jpeg')
        link.click()
      })
      .catch((error) => console.log(error))
  }

  return (
    <main className="container">
      <section className="github">
        <h1>Gere seu ticket e compartilhe com o mundo</h1>

        {success ? (
          <>
            <div className="success-wrapper">
              <CheckCircle />
              <span>TICKET GERADO COM SUCESSO</span>
            </div>

            <button onClick={downloadTicket}>Fazer download</button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="github-user">DIGITE SEU USUÁRIO DO GITHUB</label>
            <div className="input-wrapper">
              <img src={githubLogo} alt="Logo GitHub" />

              <input
                name="github-user"
                id="github-user"
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            {isError && (
              <span>Usuário inválido. Verifique e tente novamente.</span>
            )}

            <button className={`${isLoading && 'loading'}`} type="submit">
              {isLoading ? <Loader2 /> : 'Gerar meu ticket'}
            </button>
          </form>
        )}
      </section>

      <section ref={ticketRef} id="ticket" className="ticket">
        <div className="ticket-card">
          <img src={ticketCover} alt="Ticket cover" />

          <div className="ticket-info">
            <div className="user-info">
              {user ? (
                <img src={user.avatar_url} alt="Avatar" />
              ) : (
                <img src={avatarImg} alt="Avatar" />
              )}

              <span>TRIPULANTE</span>

              {user ? <span>{user.name}</span> : <span>Seu nome aqui</span>}
            </div>

            <div className="event-info-wrapper">
              <div className="event-info">
                <span>EVENTO</span>
                <span>IA PARA DEVS</span>
              </div>

              <div className="event-info">
                <span>DATA</span>
                <span>14 — 16 ago. 2023</span>
              </div>

              <div className="event-info">
                <span>HORA</span>
                <span>ao vivo — 19h</span>
              </div>

              <div className="lines">
                <img src={linesImg} alt="Lines" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
