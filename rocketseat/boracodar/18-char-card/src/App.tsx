import { Atropos } from 'atropos/react'

import charImg from './assets/character.png'

import 'atropos/atropos.min.css'
import './App.scss'

function App() {
  return (
    <div className="container">
      <div className="back-cards">
        <h1>FINN</h1>
      </div>

      <Atropos>
        <div className="card">
          <div className="card-info">
            <header>
              <h2 data-atropos-offset="5">REY SKYWALKER</h2>

              <span>
                Era uma catadora de sucata que descobriu ser sensível à Força
                durante sua busca ao lendário Mestre Jedi Luke Skywalker.
              </span>
            </header>

            <div className="character" data-atropos-offset="4">
              <img src={charImg} alt="Imagem do personagem" />
            </div>

            <main>
              <div className="info">
                <span>Filmes</span>

                <h4>
                  The Force Awakens, The Last Jedi, The Rise of Skywalker &
                  Forces of Destiny
                </h4>
              </div>

              <div className="info">
                <span>Espécie</span>

                <h4>Humana</h4>
              </div>

              <div className="info">
                <span>Altura</span>

                <h4>1,7m</h4>
              </div>

              <div className="info">
                <span>Localidade</span>

                <h4>Jakku</h4>
              </div>

              <div className="info">
                <span>Armas</span>

                <h4>Sabre de luz, Blaster, Quarterstaff</h4>
              </div>
            </main>
          </div>
        </div>
      </Atropos>

      <div className="back-cards">
        <h1>BB-8</h1>
      </div>
    </div>
  )
}

export default App
