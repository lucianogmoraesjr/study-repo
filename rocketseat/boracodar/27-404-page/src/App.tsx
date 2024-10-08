import { Player } from '@lottiefiles/react-lottie-player'
import './App.scss'

function App() {
  return (
    <div id="app">
      <main>
        <h1>Ops, esta página não foi encontrada</h1>

        <p>
          Parece que você se perdeu... Tente voltar para a página anterior ou
          acessar a home.
        </p>

        <div className="button-wrapper">
          <a className="btn" href="#">
            Voltar
          </a>
          <a className="btn" href="#">
            Ir para Home
          </a>
        </div>
      </main>

      <aside>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="107"
          viewBox="0 0 81 107"
          fill="none"
        >
          <path
            d="M0.84375 84.9688L13.832 6.74219H33.7969L20.6602 84.9688H0.84375ZM0.84375 84.9688L12.4961 67.082H52.7969V84.9688H0.84375ZM69.3477 84.9688V67.082H81V84.9688H69.3477ZM51.3125 106.195V0.804688H70.832V106.195H51.3125Z"
            fill="#BF7BFB"
          />
        </svg>

        <Player
          className="animation"
          src="https://lottie.host/ab7a5c4d-d0de-4877-be5e-8cffedab2bf1/f7kJBYBWYz.json"
          autoplay
          loop
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="107"
          viewBox="0 0 81 107"
          fill="none"
        >
          <path
            d="M0 84.9688L12.9883 6.74219H32.9531L19.8164 84.9688H0ZM0 84.9688L11.6523 67.082H51.9531V84.9688H0ZM68.5039 84.9688V67.082H80.1562V84.9688H68.5039ZM50.4688 106.195V0.804688H69.9883V106.195H50.4688Z"
            fill="#BF7BFB"
          />
        </svg>
      </aside>
    </div>
  )
}

export default App
