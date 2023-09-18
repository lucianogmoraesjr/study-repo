import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from '@phosphor-icons/react'
import { FormEvent, useState } from 'react'
import { api } from '../lib/api'

const weekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([])

  function handleToggleWeekday(weekday: number) {
    if (selectedWeekdays.includes(weekday)) {
      setSelectedWeekdays((prevState) =>
        prevState.filter((selectedWeekday) => selectedWeekday !== weekday),
      )
    } else {
      setSelectedWeekdays((prevState) => [...prevState, weekday])
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!title || weekdays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays: selectedWeekdays,
    })

    setTitle('')
    setSelectedWeekdays([])

    alert('Hábito criado com sucesso! 🎉')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="font-semibold leading-tigh mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {weekdays.map((weekday, index) => (
          <Checkbox.Root
            key={weekday}
            className="flex items-center gap-3 group"
            checked={selectedWeekdays.includes(index)}
            onCheckedChange={() => handleToggleWeekday(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="text-white leading-tight">{weekday}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
