import avatarImg from './assets/avatar.svg'
import helloImg from './assets/hello.svg'
import waterImg from './assets/water.svg'
import closeImg from './assets/close.svg'
import arrowImg from './assets/arrow.svg'

import './App.scss'

function App() {
  return (
    <div className="container">
      <header>
        <img src={avatarImg} alt="" />

        <div className="welcome">
          <span>Boa tarde,</span>
          <span id="name">
            Biro
            <img src={helloImg} alt="" />
          </span>
        </div>
      </header>

      <div className="wrapper">
        <div className="content">
          <main>
            <span id="percentage">80%</span>

            <img src={waterImg} alt="" />

            <div>
              <h1>Beber água</h1>
              <span id="goal">Meta: 3L</span>
            </div>
          </main>
        </div>

        <div className="controlsContainer">
          <div className="controls">
            <div className="goal">
              <div className="goalTitle">
                <label htmlFor="dailyGoal">Meta diária</label>

                <output id="dailyGoalValue">3000ml</output>
              </div>

              <input
                type="range"
                id="dailyGoal"
                min="1000"
                max="5000"
                step="100"
                defaultValue="3000"
              />
            </div>

            <div className="quantity">
              <div className="quantityTitle">
                <label htmlFor="goalQuantity">Quantidade por timer</label>

                <output id="quantityValue">300ml</output>
              </div>

              <input
                type="range"
                id="dailyQuantity"
                min="100"
                max="500"
                step="100"
                defaultValue="300"
              />
            </div>
          </div>

          <div className="countdown">
            <div className="hours">
              <span>00</span>
            </div>

            <span>h</span>

            <span>:</span>

            <div className="minutes">
              <span>00</span>
            </div>

            <span>m</span>
          </div>

          <div className="button">
            <button id="start">
              Começar
              <img src={arrowImg} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="modalContainer">
        <div className="modal">
          <img src={closeImg} alt="" id="close" />

          <img src={waterImg} alt="" />

          <span>Lembrete para beber água!</span>
        </div>
      </div>
    </div>
  )
}

export default App
