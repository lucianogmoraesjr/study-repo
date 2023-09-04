import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import heroImg from '../../assets/landing-hero.svg'

import './styles.scss'

export function Landing() {
  return (
    <div id="landing-page">
      <div className="content-wrapper">
        <img src={logoImg} alt="Logo de Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>

          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="hero-image">
          <img src={heroImg} alt="Hero" />
        </div>

        <div className="location">
          <strong>Viamão</strong>
          <span>Rio Grande do Sul</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={32} />
        </Link>
      </div>
    </div>
  )
}
