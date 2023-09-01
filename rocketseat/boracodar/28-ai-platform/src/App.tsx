import {
  ArrowRight,
  Code,
  ImageSquare,
  MagicWand,
  MusicNotesSimple,
  PaperPlaneRight,
  PlayCircle,
  PlusCircle,
} from '@phosphor-icons/react'
import './App.scss'

function App() {
  return (
    <div className="container">
      <header>
        <div className="icon-wrapper">
          <MagicWand />
        </div>

        <h1>Experimente o poder da Inteligência Artificial</h1>
      </header>

      <main>
        <a href="#" className="btn">
          <div className="icon-text">
            <div className="icon-wrapper">
              <Code />
            </div>
            <p>Gerador de códigos</p>
          </div>

          <ArrowRight />
        </a>

        <a href="#" className="btn">
          <div className="icon-text">
            <div className="icon-wrapper">
              <ImageSquare />
            </div>
            <p>Edição de foto</p>
          </div>

          <ArrowRight />
        </a>

        <a href="#" className="btn">
          <div className="icon-text">
            <div className="icon-wrapper">
              <PlayCircle />
            </div>
            <p>Geração de vídeos</p>
          </div>

          <ArrowRight />
        </a>

        <a href="#" className="btn">
          <div className="icon-text">
            <div className="icon-wrapper">
              <MusicNotesSimple />
            </div>
            <p>Criador de áudios e musicas </p>
          </div>

          <ArrowRight />
        </a>
      </main>

      <footer>
        <div className="input-wrapper">
          <PlusCircle />

          <input
            type="text"
            placeholder="Envie uma mensagem ou digite “/” para exibir os comandos "
          />
        </div>

        <button>
          <PaperPlaneRight />
        </button>
      </footer>
    </div>
  )
}

export default App
