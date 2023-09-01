import { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { useOption } from '../../contexts/OptionContext'

import './styles.scss'

interface OptionProps {
  label: string
  value: string
  icon?: ReactNode
}

export function Option({ label, value, icon }: OptionProps) {
  const { selectOption } = useOption()

  return (
    <li className="option">
      <input
        type="radio"
        name="category"
        value={value}
        data-label={label}
        onClick={selectOption}
      />

      {icon}
      <span className="label">{label}</span>
      <Check />
    </li>
  )
}
