import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import { api } from '../../services/api'

import logoImg from '../../assets/logo.svg'

import styles from './styles.module.scss'

interface Message {
  id: string
  text: string
  user: {
    name: string
    avatar_url: string
  }
}

const messagesQueue: Message[] = []

const socket = io('http://localhost:3333')

socket.on('new_message', (newMessage: Message) =>
  messagesQueue.push(newMessage),
)

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean),
        )

        messagesQueue.shift()
      }
    }, 3000)
  }, [])

  useEffect(() => {
    ;(async () => {
      const { data } = await api.get('/messages/last3')
      setMessages(data)
    })()
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="Logo" />

      <ul className={styles.messageList}>
        {messages.map((message) => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message?.text}</p>

            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>

              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
