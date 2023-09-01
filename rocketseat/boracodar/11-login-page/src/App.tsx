import { useState } from 'react'

import logoImg from './assets/logo.svg'
import eyeOff from './assets/eye-off.svg'
import eye from './assets/eye.svg'
import backgroundImg from './assets/background.jpg'

import './App.scss'

function App() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleTogglePassword() {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div id="container">
      <div className="login">
        <header>
          <img src={logoImg} alt="Logo" />
        </header>

        <main>
          <div className="headline">
            <h1>Acesse a plataforma</h1>
            <p>
              Faça login ou registre-se para começar a construir seus projetos
              ainda hoje.
            </p>
          </div>

          <form action="">
            <div className="input-wrapper">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div className="input-wrapper">
              <div className="label-wrapper">
                <label htmlFor="password">Senha</label>
                <a href="#">Esqueceu a senha?</a>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Digite sua senha"
                required
              />

              {showPassword ? (
                <img
                  onClick={handleTogglePassword}
                  className={`eye hide-password`}
                  src={eye}
                  alt="Eye"
                />
              ) : (
                <img
                  onClick={handleTogglePassword}
                  className={`eye hide-password`}
                  src={eyeOff}
                  alt="Eye Off"
                />
              )}
            </div>

            <button type="submit">Entrar</button>
          </form>

          <div className="create-account">
            <p>
              Ainda não tem uma conta? <a href="#">Inscreva-se</a>
            </p>
          </div>
        </main>
      </div>

      <img src={backgroundImg} alt="Plano de fundo" className="background" />
    </div>
  )
}

export default App
