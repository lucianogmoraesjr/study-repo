import { Select } from './components/Select'
import { Apple, Beef, Carrot, Milk, Sandwich } from 'lucide-react'

import { Option } from './components/Option'

import './App.scss'

function App() {
  return (
    <Select>
      <Option label="Padaria" value="bakery" icon={<Sandwich />} />
      <Option label="Legume" value="vegetable" icon={<Carrot />} />
      <Option label="Carne" value="meat" icon={<Beef />} />
      <Option label="Fruta" value="fruit" icon={<Apple />} />
      <Option label="Bebida" value="drink" icon={<Milk />} />
    </Select>
  )
}

export default App
