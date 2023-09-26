import rocketseatLogo from '../assets/rocketseat.svg'

export function Footer() {
  return (
    <footer className="flex items-center justify-between mt-20 border-t border-gray-600 pt-6">
      <div className="flex items-center gap-6">
        <img src={rocketseatLogo} alt="Logo de Rocketseat" />
        <span>Rocketseat - Todos os direitos reservados</span>
      </div>

      <span>Políticas de privacidade</span>
    </footer>
  )
}
