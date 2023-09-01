import helpImg from './assets/help.svg'
import shieldCheck from './assets/shield-check.svg'
import warningImg from './assets/warning.svg'

import './App.scss'

function App() {
  return (
    <div id="container">
      <form>
        <section id="credit-card">
          <div className="front"></div>
          <div className="back"></div>
        </section>

        <section className="inputs">
          <div className="input-wrapper">
            <label htmlFor="cc-number">Número do cartão</label>
            <input
              type="text"
              id="cc-number"
              placeholder="**** **** **** ****"
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="cc-holder">Nome do titular</label>
            <input
              type="text"
              id="cc-holder"
              placeholder="Nome como está no cartão"
              required
            />
            <div className="warning">
              <img src={warningImg} alt="Íconde de alerta" />
              Nome do titular é obrigatório
            </div>
          </div>

          <div className="validity-cvv">
            <div className="input-wrapper">
              <label htmlFor="cc-validity">Validade</label>
              <input type="text" id="cc-validity" placeholder="mm/aa" />
            </div>

            <div className="input-wrapper">
              <label htmlFor="cc-cvv" className="help">
                CVV
                <img
                  src={helpImg}
                  alt="Ícone de ajuda"
                  title="Esse número está, geralmente, nas costas do cartão"
                />
              </label>
              <input type="text" id="cc-cvv" placeholder="***" />
            </div>
          </div>
        </section>

        <footer className="info-security">
          <img src={shieldCheck} alt="Ícone de segurança" />
          Seus dados estão seguros
        </footer>

        <button>Adicionar cartão</button>
      </form>
    </div>
  )
}

export default App
