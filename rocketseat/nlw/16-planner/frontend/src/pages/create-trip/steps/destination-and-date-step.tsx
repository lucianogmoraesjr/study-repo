import { format, isSameDay, isSameMonth } from 'date-fns'
import {
  ArrowRight,
  Calendar as CalendarIcon,
  MapPin,
  Settings2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '../../../components/button'
import { DateRangePicker } from '../../../components/date-range-picker'

interface DestinationAndDateStepProps {
  isInviteInputOpen: boolean
  eventDate: DateRange | undefined
  destination: string
  onDestinationChange: (destination: string) => void
  onDateChange: (date: DateRange | undefined) => void
  onOpenInviteInput: () => void
  onCloseInviteInput: () => void
}

export function DestinationAndDateStep({
  isInviteInputOpen,
  eventDate,
  destination,
  onDateChange,
  onCloseInviteInput,
  onOpenInviteInput,
  onDestinationChange,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function handleOpenDatePicker() {
    setIsDatePickerOpen(true)
  }

  function handleCloseDatePicker() {
    setIsDatePickerOpen(false)
  }

  const formattedDateRange = useMemo(() => {
    if (eventDate && eventDate.from && eventDate.to) {
      const { from, to } = eventDate

      if (isSameDay(from, to)) {
        return format(from, "dd 'de' MMMM")
      }

      if (isSameMonth(from, to)) {
        return `${format(from, 'dd')} a ${format(to, "dd 'de' MMM")}`
      }

      return `${format(from, "dd 'de' MMM")} a ${format(to, "dd 'de' MMM")}`
    }

    return null
  }, [eventDate])

  return (
    <div className="flex h-16 items-center gap-5 rounded-xl bg-zinc-900 px-4 shadow-inner-shadow">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isInviteInputOpen}
          value={destination}
          placeholder="Para onde você vai?"
          onChange={(e) => onDestinationChange(e.target.value)}
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        />
      </div>

      <button
        type="button"
        disabled={isInviteInputOpen}
        className="flex items-center gap-2"
      >
        <CalendarIcon className="size-5 text-zinc-400" />
        <span onClick={handleOpenDatePicker} className="text-lg text-zinc-400">
          {formattedDateRange ?? 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <DateRangePicker
          date={eventDate}
          onDateChange={onDateChange}
          onClose={handleCloseDatePicker}
        />
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {isInviteInputOpen ? (
        <Button variant="secondary" type="submit" onClick={onCloseInviteInput}>
          <span className="font-medium">Alterar local/data</span>
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button type="submit" onClick={onOpenInviteInput}>
          <span className="font-medium">Continuar</span>
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}
