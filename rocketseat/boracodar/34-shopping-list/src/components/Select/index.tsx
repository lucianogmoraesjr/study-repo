import { ReactNode, useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { useOption } from '../../contexts/OptionContext'

import './styles.scss'

interface SelectProps {
  children: ReactNode
}

export function Select({ children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { selectedOption } = useOption()

  const selectRef = useRef<HTMLDivElement>(null)
  const optionsViewButtonRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const keyPress = (event: KeyboardEvent) => {
      if (!selectRef.current?.classList.contains('open')) return

      if (event.key === 'Escape' || event.key === ' ') {
        optionsViewButtonRef.current?.click()
      }
    }

    document.addEventListener('keydown', keyPress)

    return () => document.removeEventListener('keydown', keyPress)
  }, [])

  function handleOptionsViewButtonClick() {
    setIsOpen(!isOpen)

    const input: HTMLInputElement | null =
      document.querySelector('.option input:checked') ||
      document.querySelector('.option input')

    input?.focus()
  }

  return (
    <div ref={selectRef} className={`select ${isOpen ? 'open' : ''}`}>
      <div id="category-select">
        <label htmlFor="options-view-button">Categoria</label>
        <input
          ref={optionsViewButtonRef}
          type="checkbox"
          id="options-view-button"
          onClick={handleOptionsViewButtonClick}
        />

        <div id="select-button">
          <div id="selected-value">
            {selectedOption || 'Selecione a categoria'}
          </div>

          <div id="chevrons">
            <ChevronDown id="chevron-down" />
            <ChevronUp id="chevron-up" />
          </div>
        </div>
      </div>

      <ul id="options">{children}</ul>
    </div>
  )
}
