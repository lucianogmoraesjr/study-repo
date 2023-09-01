import { IoAdd, IoPencil, IoSearchOutline, IoTrash } from 'react-icons/io5'

import './App.scss'

function App() {
  return (
    <div id="container">
      <header className="header-container">
        <nav>
          <h2>Meus contatos</h2>

          <ul>
            <li>
              <IoAdd />
            </li>

            <li>
              <IoPencil />
            </li>

            <li>
              <IoTrash />
            </li>
          </ul>
        </nav>

        <form>
          <div className="input-wrapper">
            <label className="sr-only" htmlFor="filter">
              Busque por nome ou dados de contato
            </label>
            <IoSearchOutline />
            <input
              type="text"
              id="filter"
              name="filter"
              placeholder="Busque por nome ou por dados de contato"
            />
          </div>
        </form>
      </header>

      <section className="contacts-container">
        <div className="list-wrapper">
          <div className="letter purple">A</div>

          <ul>
            <li>
              <div className="person">
                <img
                  src="https://randomuser.me/api/portraits/men/5.jpg"
                  alt="Foto de contato"
                />

                <div className="contact">
                  <h3>Abraão</h3>
                  <p>(11) 90876-1234</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="list-wrapper">
          <div className="letter green">B</div>

          <ul>
            <li>
              <div className="person">
                <img
                  src="https://randomuser.me/api/portraits/women/5.jpg"
                  alt="Foto de contato"
                />

                <div className="contact">
                  <h3>Beatriz</h3>
                  <p>(11) 90876-1234</p>
                </div>
              </div>
            </li>

            <li>
              <div className="person">
                <img
                  src="https://randomuser.me/api/portraits/women/6.jpg"
                  alt="Foto de contato"
                />

                <div className="contact">
                  <h3>Brenda</h3>
                  <p>(11) 90876-1234</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="list-wrapper">
          <div className="letter pink">C</div>

          <ul>
            <li>
              <div className="person">
                <img
                  src="https://randomuser.me/api/portraits/men/5.jpg"
                  alt="Foto de contato"
                />

                <div className="contact">
                  <h3>Caio</h3>
                  <p>(11) 90876-1234</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="list-wrapper">
          <div className="letter blue">D</div>

          <ul>
            <li>
              <div className="person">
                <img
                  src="https://randomuser.me/api/portraits/women/5.jpg"
                  alt="Foto de contato"
                />

                <div className="contact">
                  <h3>Dani</h3>
                  <p>(11) 90876-1234</p>
                </div>
              </div>
            </li>

            <li>
              <div className="person">
                <img
                  src="https://randomuser.me/api/portraits/women/6.jpg"
                  alt="Foto de contato"
                />

                <div className="contact">
                  <h3>Diego</h3>
                  <p>(11) 90876-1234</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="list-wrapper">
          <div className="letter yellow">E</div>

          <ul>
            <li>
              <div className="person">
                <img
                  src="https://randomuser.me/api/portraits/men/5.jpg"
                  alt="Foto de contato"
                />

                <div className="contact">
                  <h3>Elias</h3>
                  <p>(11) 90876-1234</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="list-wrapper">
          <div className="letter purple">F</div>

          <ul>
            <li>
              <div className="person">
                <img
                  src="https://randomuser.me/api/portraits/women/5.jpg"
                  alt="Foto de contato"
                />

                <div className="contact">
                  <h3>Fábio</h3>
                  <p>(11) 90876-1234</p>
                </div>
              </div>
            </li>

            <li>
              <div className="person">
                <img
                  src="https://randomuser.me/api/portraits/women/6.jpg"
                  alt="Foto de contato"
                />

                <div className="contact">
                  <h3>Fernando</h3>
                  <p>(11) 90876-1234</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default App
