import img360 from './assets/360.svg'
import closeImg from './assets/close.svg'
import sofaImg from './assets/sofa.png'
import sofaGif from './assets/sofa.gif'

import './styles.scss'
import { useState } from 'react'

function App() {
  const [animate, setAnimate] = useState(false)

  function toggleAnimate() {
    setAnimate(!animate)
  }

  return (
    <div id='container'>
      <div id="product-image" className={animate ? 'animated' : ''}>
        <button className='btn-360' onClick={toggleAnimate}>
          <img src={img360} alt="Animar imagem" />
        </button>

        <button className='btn-close' onClick={toggleAnimate}>
          <img src={closeImg} alt="Parar animação" />
        </button>

        <img id='static' src={sofaImg} alt="Sofá" />

        <img id='animated' src={sofaGif} alt="Sofá animado" />
      </div>

      <div id="product-details">
        <h4>CÓDIGO: 42404</h4>
        <h1>Sofá Margot II - Rosé</h1>
        <p>R$ 4.000,00</p>
        <button>ADICIONAR À CESTA</button>
      </div>
    </div>
  )
}

export default App
