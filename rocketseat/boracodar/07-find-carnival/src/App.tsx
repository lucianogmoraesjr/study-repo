import { MagnifyingGlass, MapPin, CaretDown } from '@phosphor-icons/react'

import image01 from './assets/images/01.jpg'

import './App.scss'

function App() {
  return (
    <div id="container">
      <header>
        <div className="content">
          <div className="top">
            <p>find your block</p>
            <h1>
              Encontre os <span>melhores blocos</span> de carnaval de 2023
            </h1>
          </div>

          <form className="search">
            <div className="search-field">
              <label htmlFor="name" className="sr-only">
                Pesquise por nome
              </label>
              <MagnifyingGlass />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Pesquise por nome"
              />
            </div>

            <div className="search-field select">
              <label htmlFor="city" className="sr-only">
                Selecione uma cidade
              </label>
              <MapPin />
              <select id="name" name="name">
                <option value="0" selected>
                  Selecione uma cidade
                </option>
                <option value="sao-paulo">São Paulo</option>
                <option value="rio-de-janeiro">Rio de Janeiro</option>
                <option value="salvador">Salvador</option>
              </select>
              <CaretDown color="#858793" />
            </div>

            <button className="btn primary">Buscar agora</button>
          </form>
        </div>
      </header>

      <main>
        <div className="main-content">
          <section className="top">
            <h2>Blocos recomendados</h2>

            <div className="view">
              <button className="btn primary">Lista</button>
              <button className="btn secondary">Mapa</button>
            </div>
          </section>
          <section className="cards">
            <div className="card">
              <img src={image01} alt="Imagem" />

              <div className="card-content">
                <h3>O Python do vovô não sobe mais</h3>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>

                <div className="location">
                  <MapPin />
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </div>

            <div className="card">
              <img src={image01} alt="Imagem" />

              <div className="card-content">
                <h3>O Python do vovô não sobe mais</h3>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>

                <div className="location">
                  <MapPin />
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </div>

            <div className="card">
              <img src={image01} alt="Imagem" />

              <div className="card-content">
                <h3>O Python do vovô não sobe mais</h3>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>

                <div className="location">
                  <MapPin />
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </div>

            <div className="card">
              <img src={image01} alt="Imagem" />

              <div className="card-content">
                <h3>O Python do vovô não sobe mais</h3>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>

                <div className="location">
                  <MapPin />
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </div>

            <div className="card">
              <img src={image01} alt="Imagem" />

              <div className="card-content">
                <h3>O Python do vovô não sobe mais</h3>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>

                <div className="location">
                  <MapPin />
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </div>

            <div className="card">
              <img src={image01} alt="Imagem" />

              <div className="card-content">
                <h3>O Python do vovô não sobe mais</h3>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>

                <div className="location">
                  <MapPin />
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </div>

            <div className="card">
              <img src={image01} alt="Imagem" />

              <div className="card-content">
                <h3>O Python do vovô não sobe mais</h3>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>

                <div className="location">
                  <MapPin />
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </div>

            <div className="card">
              <img src={image01} alt="Imagem" />

              <div className="card-content">
                <h3>O Python do vovô não sobe mais</h3>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>

                <div className="location">
                  <MapPin />
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </div>

            <div className="card">
              <img src={image01} alt="Imagem" />

              <div className="card-content">
                <h3>O Python do vovô não sobe mais</h3>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint.
                </p>

                <div className="location">
                  <MapPin />
                  <span>São Paulo - SP</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
