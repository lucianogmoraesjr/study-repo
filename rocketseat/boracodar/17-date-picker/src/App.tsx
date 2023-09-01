import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import './App.scss'

const months = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

function App() {
  const thisMonth = months[new Date().getMonth()]

  return (
    <div id="container">
      <header>
        <div>
          <CaretLeft weight="bold" />
        </div>
        <span>{new Date().getFullYear()}</span>
        <div>
          <CaretRight weight="bold" />
        </div>
      </header>
      <main>
        {months.map((month, index) => (
          <div key={index} className={thisMonth === month ? 'active' : ''}>
            {month}
          </div>
        ))}
      </main>
    </div>
  )
}

export default App
