import { Check, Info } from '@phosphor-icons/react'
import './App.scss'

function App() {
  return (
    <div id="container">
      <div className="pricing-table">
        <section className="essentials">
          <div className="inner">
            <p>PARA VOCÊ COMEÇAR</p>

            <div className="title-price">
              <strong className="title">Essentials</strong>
              <span className="price">
                R$ <strong>19,97</strong>
              </span>
            </div>

            <button className="primary">Assinar agora</button>

            <ul>
              <li>
                <Check />
                <span>Até 3 usuários</span>
                <Info />
              </li>
              <li>
                <Check />
                <span>Autoatendimento</span>
                <Info />
              </li>
            </ul>
          </div>
        </section>

        <section className="ultimate best">
          <div className="inner">
            <p>para você decolar</p>

            <div className="title-price">
              <strong className="title">Ultimate</strong>
              <span className="price">
                R$ <strong>29,97</strong>
              </span>
            </div>

            <button className="secondary">Assinar Agora</button>

            <ul>
              <li>
                <Check />
                <span>Usuários ilimitados</span>
                <Info />
              </li>

              <li>
                <Check />
                <span>Suporte 24/7</span>
                <Info />
              </li>

              <li>
                <Check />
                <span>CMS Dedicado</span>
                <Info />
              </li>

              <li>
                <Check />
                <span>Treinamentos</span>
                <Info />
              </li>
            </ul>
          </div>
        </section>

        <section className="enterprise">
          <div className="inner">
            <p>para sua empresa</p>

            <div className="title-price">
              <strong className="title">Enterprise</strong>
            </div>

            <button className="primary">Fale com a gente</button>

            <ul>
              <li>
                <Check />
                <span>
                  Pano customizado especialmente para a necessidade de seu
                  negócio
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
