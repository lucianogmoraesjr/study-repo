import { Phone, ShieldPlus, Star } from '@phosphor-icons/react'

import carImg from './assets/car-purple.png'

import './App.scss'

function App() {
  return (
    <div className="card">
      <div className="card-drag"></div>

      <div className="card-header">
        <h1>
          Encontre <span>Boris</span> no local de partida
        </h1>
        <p>Chega em 3 minutos (800 metros)</p>
      </div>

      <div className="card-body">
        <div className="left">
          <div className="driver">
            <div className="driver-avatar">
              <img
                src="https://github.com/lucianogmoraesjr.png"
                alt="Imagem de Luciano"
              />
            </div>
            <div className="driver-stars">
              <div className="star">
                <Star weight="fill" />
              </div>
              <strong>5.0</strong>
            </div>
            <div className="driver-name">Boris C.</div>
          </div>

          <div className="car-img">
            <img src={carImg} alt="Imagem de carro roxo" />
          </div>
        </div>

        <div className="right">
          <div className="car-plate">BCD0D19</div>
          <div className="car-model">Honda Civic Roxo</div>
        </div>
      </div>

      <div className="card-footer">
        <div className="input-wrapper">
          <label htmlFor="message">Enviar mensagem para Boris...</label>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Enviar mensagem para Boris..."
          />
        </div>

        <Phone weight="fill" />

        <ShieldPlus weight="fill" />
      </div>
    </div>
  )
}

export default App
