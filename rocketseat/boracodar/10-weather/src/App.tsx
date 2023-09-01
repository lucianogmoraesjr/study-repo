import pinImg from './assets/pin.svg'
import windImg from './assets/wind.svg'
import humidityImg from './assets/humidity.svg'
import rainImg from './assets/rain.svg'
import leafImg from './assets/leaf.svg'
import sunTimeImg from './assets/sun-time.svg'
import sunChart from './assets/sun-chart.svg'
import weatherCloud from './assets/weather-cloud.svg'
import weatherSun from './assets/weather-sun.svg'
import weatherRain from './assets/weather-rain.svg'
import weatherStorm from './assets/weather-storm.svg'
import weatherPartialy from './assets/weather-partialy.svg'

import './App.scss'

function App() {
  return (
    <main id="container">
      <section className="weather-now">
        <div className="location">
          <img src={pinImg} alt="Icone de localização" />
          <strong>Rio do Sul, SC</strong>
        </div>

        <div className="temp">
          <div className="temp-number">
            <h1>18</h1>
            <div className="celsius">°C</div>
            <div className="max-min">
              <h2>
                22° <span>16°</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="statistics">
          <div className="card-stats">
            <img src={windImg} alt="Icone de vento" />

            <div className="info">
              <p>Vento</p>
              <h5>
                17 <span>km/h</span>
              </h5>
            </div>
          </div>

          <div className="card-stats">
            <img src={humidityImg} alt="Icone de umidade" />

            <div className="info">
              <p>Umidade</p>
              <h5>
                31 <span>%</span>
              </h5>
            </div>
          </div>

          <div className="card-stats">
            <img src={rainImg} alt="Icone de chuva" />

            <div className="info">
              <p>Chuva</p>
              <h5>
                10 <span>%</span>
              </h5>
            </div>
          </div>
        </div>
      </section>

      <section className="air-quality">
        <h2>
          <img src={leafImg} alt="Icone de folha" />
          Qualidade do ar
        </h2>

        <p className="quality">Boa</p>
        <p className="quality-value">21</p>

        <div className="info">
          <div className="value">
            <p>12.9</p>
            <small>PM2.5</small>
          </div>

          <div className="value">
            <p>12.9</p>
            <small>PM10</small>
          </div>

          <div className="value">
            <p>2.1</p>
            <small>SO₂</small>
          </div>

          <div className="value">
            <p>1.4</p>
            <small>NO₂</small>
          </div>

          <div className="value">
            <p>21.2</p>
            <small>O₃</small>
          </div>

          <div className="value">
            <p>0.7</p>
            <small>CO</small>
          </div>
        </div>
      </section>

      <section className="sun-time">
        <h2>
          <img src={sunTimeImg} alt="Icone de sol" />
          Horário do sol
        </h2>

        <div className="sun-chart-wrapper">
          <div className="sun-chart">
            <div className="chart">
              <img src={sunChart} alt="Imagem de um gráfico" />
            </div>

            <time className="now">17:48</time>
          </div>
        </div>

        <div className="time">
          <time className="sunrise">06:00</time>
          <time className="sunset">18:52</time>
        </div>
      </section>

      <section className="week-weather">
        <div className="day">
          <h4>Amanhã</h4>
          <img src={weatherCloud} alt="Imagem de nuvem" />
          <p>
            21° <span>16°</span>
          </p>
        </div>

        <div className="day">
          <h4>Sexta</h4>
          <img src={weatherSun} alt="Imagem de nuvem" />
          <p>
            28° <span>20°</span>
          </p>
        </div>

        <div className="day">
          <h4>Sábado</h4>
          <img src={weatherRain} alt="Imagem de nuvem" />
          <p>
            25° <span>21°</span>
          </p>
        </div>

        <div className="day">
          <h4>Domingo</h4>
          <img src={weatherStorm} alt="Imagem de nuvem" />
          <p>
            20° <span>14°</span>
          </p>
        </div>

        <div className="day">
          <h4>Segunda</h4>
          <img src={weatherPartialy} alt="Imagem de nuvem" />
          <p>
            24° <span>18°</span>
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
