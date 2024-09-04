import { ptBR } from 'date-fns/locale'
import { ComponentProps } from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'

import 'react-day-picker/style.css'

type CalendarProps = ComponentProps<typeof DayPicker>

export function Calendar(props: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      locale={ptBR}
      mode="range"
      showOutsideDays
      numberOfMonths={2}
      classNames={{
        nav: `${defaultClassNames.nav} left-1`,
        button_previous: 'absolute left-1',
        button_next: 'absolute right-1',
        chevron: 'fill-lime-300',
        month_caption: `${defaultClassNames.month_caption} flex items-center justify-center`,
        today:
          'bg-lime-300 text-zinc-800 data-[selected]:text-zinc-50 [&:not([data-selected])]:rounded-lg',
        range_start: 'rounded-l-lg bg-lime-600',
        range_end: 'rounded-r-lg bg-lime-600',
        range_middle: `${defaultClassNames.range_middle} bg-lime-300 text-zinc-700 data-[today]:text-zinc-700 data-[today]:font-bold`,
        outside: 'opacity-20',
        selected: `${defaultClassNames.selected} [&.rdp-day_button]:border-0`,
        day: `${defaultClassNames.day} last-of-type:data-[selected]:rounded-r-lg first-of-type:data-[selected]:rounded-l-lg`,
      }}
      {...props}
    />
  )
}
