import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'

import { useAuth } from '../../hooks/useAuth'

import styles from './styles.module.scss'
import { FormEvent, useState } from 'react'
import { api } from '../../services/api'

export function SendMessageForm() {
  const [message, setMessage] = useState('')

  const { user, signOut } = useAuth()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!message.trim()) {
      return
    }

    await api.post('messages', { text: message })

    setMessage('')
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={handleSubmit}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}
