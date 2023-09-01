import { Minus, Plus, Tag, X } from '@phosphor-icons/react'

import monitorImg from './assets/product-image-monitor.jpg'
import cadeiraImg from './assets/product-image-cadeira.jpg'

import './App.scss'

function App() {
  return (
    <div id="app">
      <header>
        <div className="title">
          Seu carrinho tem <strong>5 itens</strong>
        </div>

        <X />
      </header>

      <main>
        <div className="item">
          <img src={monitorImg} alt="Imagem de monitor" />

          <div className="details">
            <div className="title">
              Monitor Gamer Curvo 49 DQHD, 240Hz, 1ms, HDMI e...
            </div>
            <div className="price-qty">
              <div className="price">R$ 8.599,90</div>
              <div className="qty">
                <button className="sub">
                  <Minus />
                </button>
                <span>1</span>
                <button className="add">
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="item">
          <img src={cadeiraImg} alt="Imagem de monitor" />

          <div className="details">
            <div className="title">
              Cadeira Gamer RGB - Preta com Iluminação (Led)
            </div>
            <div className="price-qty">
              <div className="price">R$ 959,90</div>
              <div className="qty">
                <button className="sub">
                  <Minus />
                </button>
                <span>1</span>
                <button className="add">
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="item">
          <img src={cadeiraImg} alt="Imagem de monitor" />

          <div className="details">
            <div className="title">
              Cadeira Gamer RGB - Preta com Iluminação (Led)
            </div>
            <div className="price-qty">
              <div className="price">R$ 959,90</div>
              <div className="qty">
                <button className="sub">
                  <Minus />
                </button>
                <span>1</span>
                <button className="add">
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="item">
          <img src={cadeiraImg} alt="Imagem de monitor" />

          <div className="details">
            <div className="title">
              Cadeira Gamer RGB - Preta com Iluminação (Led)
            </div>
            <div className="price-qty">
              <div className="price">R$ 959,90</div>
              <div className="qty">
                <button className="sub">
                  <Minus />
                </button>
                <span>1</span>
                <button className="add">
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="item">
          <img src={cadeiraImg} alt="Imagem de monitor" />

          <div className="details">
            <div className="title">
              Cadeira Gamer RGB - Preta com Iluminação (Led)
            </div>
            <div className="price-qty">
              <div className="price">R$ 959,90</div>
              <div className="qty">
                <button className="sub">
                  <Minus />
                </button>
                <span>1</span>
                <button className="add">
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="item">
          <img src={cadeiraImg} alt="Imagem de monitor" />

          <div className="details">
            <div className="title">
              Cadeira Gamer RGB - Preta com Iluminação (Led)
            </div>
            <div className="price-qty">
              <div className="price">R$ 959,90</div>
              <div className="qty">
                <button className="sub">
                  <Minus />
                </button>
                <span>1</span>
                <button className="add">
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="total">
          <span>Total:</span>
          <strong>R$ 10.681,60</strong>
        </div>

        <div className="coupon">
          <Tag />
          <span>Adicionar cupom</span>
        </div>

        <button>Finalizar compra</button>
      </footer>
    </div>
  )
}

export default App
