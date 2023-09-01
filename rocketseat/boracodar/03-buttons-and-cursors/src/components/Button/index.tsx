import { CircleNotch, List } from 'phosphor-react'

import './styles.scss'

interface ButtonProps {
  type?: 'hover' | 'focus' | 'disabled' | 'loading' | 'movable' | undefined
  text: string
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export function Button({ type, text, variant }: ButtonProps) {
  return (
    <button className={`${variant ? variant : 'primary'} ${type ? type : undefined}`}>
      {type === 'loading' && <CircleNotch size='16px' weight='bold' /> }      
      {type === 'movable' && <List size='16px' weight='bold' /> }      
      {text}
    </button>
  )
}