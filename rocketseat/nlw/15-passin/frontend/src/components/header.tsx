import logoImg from '../assets/logo.svg'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="flex items-center gap-5">
      <img src={logoImg} alt="Logo de NLW Unite" />

      <nav className="flex items-center gap-5">
        <NavLink href="">Eventos</NavLink>
        <NavLink href="">Participantes</NavLink>
      </nav>
    </header>
  )
}
