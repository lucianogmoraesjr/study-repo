import {
  ReactNode,
  createContext,
  useState,
  MouseEvent,
  useContext,
} from 'react'

interface Option {
  selectedOption: string
  selectOption: (event: MouseEvent<HTMLInputElement>) => void
}

interface OptionProviderProps {
  children: ReactNode
}

export const OptionContext = createContext({} as Option)

export function OptionProvider({ children }: OptionProviderProps) {
  const [selectedOption, setSelectedOption] = useState('')

  function selectOption(event: MouseEvent<HTMLInputElement>) {
    setSelectedOption(event.currentTarget.dataset.label!)

    const optionsViewButton = document.getElementById('options-view-button')

    optionsViewButton?.click()
  }

  return (
    <OptionContext.Provider value={{ selectedOption, selectOption }}>
      {children}
    </OptionContext.Provider>
  )
}

export function useOption() {
  const context = useContext(OptionContext)
  return context
}
