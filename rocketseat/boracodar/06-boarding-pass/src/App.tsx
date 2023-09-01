import qrcodeImg from './assets/qrcode.png'
import airplaneImg from './assets/airplane.svg'

import './App.scss'

function App() {
  return (
    <div id="container">
      <div id="boarding-pass">
        <h1>Cartão de embarque</h1>

        <main id="ticket">
          <section className="top">
            <div className="flight">
              <div className="number">
                <p>Voo</p>
                <strong>RS995</strong>
              </div>
              <div className="date">
                <p>Data</p>
                <strong>23/05/2023</strong>
              </div>
            </div>

            <div className="flight">
              <div className="departure">
                <p>São Paulo, Brazil</p>
                <strong>GRU</strong>
                <time>17:00</time>
              </div>

              <div className="airplane">
                <img src={airplaneImg} alt="Icone de um avião" />
              </div>

              <div className="arrival">
                <p>São Francisco, EUA</p>
                <strong>SFO</strong>
                <time>
                  04:48<sup>+1</sup>
                </time>
              </div>
            </div>
          </section>

          <section className="middle">
            <div className="name">
              <p>Passageiro</p>
              <strong>Rodrigo Terron</strong>
            </div>

            <div className="seat">
              <p>Assento</p>
              <strong>28A</strong>
            </div>
          </section>

          <section className="bottom">
            <div className="bottom-container">
              <dl>
                <dt>
                  <p>Embarque</p>
                  <time>16:15</time>
                </dt>
                <dt>
                  <p>Terminal</p>
                  <strong>2</strong>
                </dt>
                <dt>
                  <p>Portão</p>
                  <strong>15 </strong>
                </dt>
              </dl>

              <div className="qrcode">
                <img src={qrcodeImg} alt="Imagem de QR Code" />
                <p>Grupo de embarque: 3</p>
              </div>
            </div>

            <p>
              <strong>Atenção:</strong> o portão fecha 16:45
            </p>
          </section>
        </main>

        <footer>
          Qualquer problema procure o balcão de atendimento da sua companhia
          aérea
        </footer>
      </div>
    </div>
  )
}

export default App
