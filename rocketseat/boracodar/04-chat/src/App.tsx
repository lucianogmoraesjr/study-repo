import { useEffect, useRef } from 'react'
import { X, PaperPlaneRight } from '@phosphor-icons/react'

import './App.scss'

function App() {
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
    }
  }, [])

  return (
    <div id="app">
      <header>
        <div className="user-info">
          <img
            src="https://randomuser.me/api/portraits/women/75.jpg"
            alt="Imagem do usuário"
          />

          <div className="user-status">
            <strong>Cecília Sassaki</strong>
            <div className="status">Online</div>
          </div>
        </div>

        <div className="close-chat">
          <X weight="bold" />
        </div>
      </header>

      <main ref={messagesRef}>
        <div className="last-chat">Hoje 11:30</div>

        <div className="messages">
          <div className="message">
            <div className="message-header">Cecília - 11:30</div>
            <div className="message-content">
              Tive uma ideia incrível para um projeto! 😍
            </div>
          </div>

          <div className="message you">
            <div className="message-header">Você - 11:32</div>
            <div className="message-content">Sério? Me conta mais.</div>
          </div>

          <div className="message">
            <div className="message-header">Cecília - 11:34</div>
            <div className="message-content">
              E se a gente fizesse um chat moderno e responsivo em apenas uma
              semana?
            </div>
          </div>

          <div className="message you">
            <div className="message-header">Você - 11:36</div>
            <div className="message-content">
              <strong>#boraCodar! 🚀</strong>
            </div>
          </div>

          <div className="message">
            <div className="message-header">Cecília - 11:34</div>
            <div className="message-content">
              E se a gente fizesse um chat moderno e responsivo em apenas uma
              semana?
            </div>
          </div>

          <div className="message you">
            <div className="message-header">Você - 11:36</div>
            <div className="message-content">
              <strong>#boraCodar! 🚀</strong>
            </div>
          </div>

          <div className="message">
            <div className="message-header">Cecília - 11:34</div>
            <div className="message-content">
              E se a gente fizesse um chat moderno e responsivo em apenas uma
              semana?
            </div>
          </div>

          <div id="my-message" className="message you">
            <div className="message-header">Você - 11:36</div>
            <div className="message-content">
              <strong>
                #boraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaCodar!
                🚀
              </strong>
            </div>
          </div>
        </div>
      </main>

      <form>
        <input type="text" placeholder="Digite sua mensagem" />
        <button>
          <PaperPlaneRight size={24} color="#E1E1E6" weight="fill" />
        </button>
      </form>
    </div>
  )
}

export default App
