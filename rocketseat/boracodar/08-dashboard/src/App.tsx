import smileImg from './assets/smile.svg'

import './App.scss'
import { CSSProperties } from 'react'

function App() {
  return (
    <main id="container">
      <div className="box nps">
        <div className="top">NPS geral</div>
        <div className="middle">
          <img src={smileImg} alt="Emoji de sorriso" />
          Excelente
        </div>
        <div className="bottom">
          <span>NPS Score</span>
          <span>75</span>
        </div>
      </div>

      <div className="box sell">
        <div className="top">Vendas fechadas</div>
        <div className="middle">
          <svg
            viewBox="0 0 232 232"
            style={{ '--percentage': 70 } as CSSProperties}
          >
            <circle cx="50%" cy="50%" r="98.5" opacity="0.1" stroke="#d9d9d9" />
            <circle
              cx="50%"
              cy="50%"
              r="98.5"
              stroke="url(#paint0_linear_201_85)"
            />

            <defs>
              <linearGradient
                id="paint0_linear_201_85"
                x1="-9"
                y1="82"
                x2="145"
                y2="178"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#CE9FFC" />
                <stop offset="1" stopColor="#7367F0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="content">
            <h3>70%</h3>
            <p>alcançada</p>
          </div>
        </div>
        <div className="bottom">
          <div className="item">
            <span>Esperado</span>
            <span>100</span>
          </div>
          <div className="item">
            <span className="violet">Alcançado</span>
            <span>70</span>
          </div>
        </div>
      </div>

      <div className="box target">
        <div className="top">Meta mensal</div>
        <div className="middle">
          <svg
            viewBox="0 0 232 232"
            style={{ '--percentage': 90 } as CSSProperties}
          >
            <circle cx="50%" cy="50%" r="98.5" opacity="0.1" stroke="#d9d9d9" />
            <circle
              cx="50%"
              cy="50%"
              r="98.5"
              stroke="url(#paint0_linear_201_104)"
            />

            <defs>
              <linearGradient
                id="paint0_linear_201_104"
                x1="1.97421e-07"
                y1="82"
                x2="154"
                y2="178"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#DF9780" />
                <stop offset="1" stopColor="#A66DE9" />
              </linearGradient>
            </defs>
          </svg>

          <div className="content">
            <h3>90%</h3>
            <p>alcançada</p>
          </div>
        </div>
        <div className="bottom">
          <div className="item">
            <span>Esperado</span>
            <span>R$ 70K</span>
          </div>
          <div className="item">
            <span className="purple">Alcançado</span>
            <span>R$ 63K</span>
          </div>
        </div>
      </div>

      <div className="box weekly-sell">
        <h1 className="top">Vendas por dia da semana</h1>

        <div className="wrapper">
          <div className="left">
            <div className="more-sales">
              <span>Dia com mais vendas</span>
              quarta-feira
            </div>
            <div className="less-sales">
              <span>Dia com menos vendas</span>
              domingo
            </div>
          </div>

          <div className="right">
            <div className="bars">
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ '--height': '3.9rem' } as CSSProperties}
                ></div>
                <span>dom</span>
              </div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ '--height': '11.5rem' } as CSSProperties}
                ></div>
                <span>seg</span>
              </div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ '--height': '7.6rem' } as CSSProperties}
                ></div>
                <span>ter</span>
              </div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ '--height': '15.9rem' } as CSSProperties}
                ></div>
                <span>qua</span>
              </div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ '--height': '12.9rem' } as CSSProperties}
                ></div>
                <span>qui</span>
              </div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ '--height': '12rem' } as CSSProperties}
                ></div>
                <span>sex</span>
              </div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ '--height': '6.9rem' } as CSSProperties}
                ></div>
                <span>sab</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
