import {
  Bell,
  CaretRight,
  Devices,
  Key,
  PersonArmsSpread,
  Question,
  SignOut,
  UserCircle,
  UserSwitch,
} from '@phosphor-icons/react'
import './App.scss'

function App() {
  return (
    <main>
      <div className="card">
        <header>
          <div className="avatar">
            <img
              src="https://github.com/lucianogmoraesjr.png"
              alt="Imagem de avatar"
            />
          </div>

          <div className="profile-info">
            <h2>Luciano Moraes Jr.</h2>
            <span>lucianogmoraesjr@gmail.com</span>
          </div>
        </header>

        <div className="settings-wrapper">
          <section className="settings">
            <h3>CONTA</h3>

            <div className="setting">
              <UserCircle />

              <span>Dados pessoais</span>

              <CaretRight />
            </div>

            <div className="setting">
              <Key />

              <span>Informações de login</span>

              <CaretRight />
            </div>
          </section>

          <section className="settings">
            <h3>PREFERÊNCIAS</h3>

            <div className="setting">
              <Bell />

              <span>Notificações</span>

              <CaretRight />
            </div>

            <div className="setting">
              <PersonArmsSpread />

              <span>Acessibilidade</span>

              <CaretRight />
            </div>
          </section>

          <section className="settings">
            <h3>PRIVACIDADE</h3>

            <div className="setting">
              <Devices />

              <span>Aparelhos conectados</span>

              <CaretRight />
            </div>

            <div className="setting">
              <UserSwitch />

              <span>Contas vinculadas</span>

              <CaretRight />
            </div>
          </section>
        </div>

        <footer>
          <div className="action-wrapper">
            <div className="action">
              <Question />

              <span>Central de Ajuda</span>
            </div>

            <div className="action">
              <SignOut />

              <span>Sair</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default App
