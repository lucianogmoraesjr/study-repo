import { X } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { Calendar } from './calendar'

interface DateRangePickerProps {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
  onClose: () => void
}

export function DateRangePicker({
  date,
  onDateChange,
  onClose,
}: DateRangePickerProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-inner-shadow">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione a data</h2>

            <button type="button" onClick={onClose}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <Calendar mode="range" selected={date} onSelect={onDateChange} />
        </div>
      </div>
    </div>
  )
}
