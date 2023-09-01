import { useState } from 'react'

import pamonhaImg from './assets/pamonha.png'
import lessImg from './assets/less.svg'
import plusImg from './assets/plus.svg'
import basketImg from './assets/basket.svg'
import panImg from './assets/pan.svg'

import './App.scss'

function App() {
  const [counter, setCounter] = useState(1)

  function increaseCounter() {
    setCounter((prevState) => prevState + 1)
  }

  function decreaseCounter() {
    if (counter === 1) return

    setCounter((prevState) => prevState - 1)
  }

  return (
    <>
      <section className="top">
        <picture>
          <img src={pamonhaImg} alt="Pamonha" />
        </picture>

        <div className="info">
          <h1>Pamonha</h1>
          <p>Prato típico com milho verde ralado</p>

          <div className="portions">
            <span>Porções</span>

            <button onClick={decreaseCounter}>
              <img src={lessImg} alt="Menos" />
            </button>

            <p>{counter.toString().padStart(2, '0')}</p>

            <button onClick={increaseCounter}>
              <img src={plusImg} alt="Mais" />
            </button>
          </div>
        </div>
      </section>

      <section className="bottom">
        <div className="ingredients">
          <div className="title">
            <img src={basketImg} alt="Cesta" />
            <h2>Ingredientes</h2>
          </div>

          <ul>
            <li>{counter} espiga de milho verde</li>
            <li>{counter} colher de sopa de açúcar</li>
            <li>{counter} colher de sopa de manteiga</li>
            <li>Sal a gosto</li>
            <li>Palha de milho (para embrulhar)</li>
          </ul>
        </div>

        <div className="preparation">
          <div className="title">
            <img src={panImg} alt="Panela" />
            <h2>Modo de preparo</h2>
          </div>

          <ol>
            <li>Descasque a espiga de milho e corte os grãos.</li>
            <li>Bata o milho, açúcar, manteiga e sal no liquidificador.</li>
            <li>Coloque a massa nas palhas de milho e feche bem.</li>
            <li>Cozinhe em água fervente por cerca de 40 minutos.</li>
            <li>Deixe esfriar e sirva.</li>
          </ol>
        </div>
      </section>
    </>
  )
}

export default App
