import { format, isSameDay, isSameMonth } from 'date-fns'
import { Calendar, MapPin, Settings2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'

interface Trip {
  id: string
  destination: string
  startsAt: string
  endsAt: string
  isConfirmed: boolean
}

export function TripDetailsHeader() {
  const [trip, setTrip] = useState<Trip | undefined>()

  const { tripId } = useParams()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  const formattedDateRange = useMemo(() => {
    if (trip) {
      const { startsAt, endsAt } = trip

      if (isSameDay(startsAt, endsAt)) {
        return format(startsAt, "dd 'de' MMMM")
      }

      if (isSameMonth(startsAt, endsAt)) {
        return `${format(startsAt, 'dd')} a ${format(endsAt, "dd 'de' MMM")}`
      }

      return `${format(startsAt, "dd 'de' MMM")} a ${format(endsAt, "dd 'de' MMM")}`
    }

    return null
  }, [trip])

  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-6 shadow-inner-shadow">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{formattedDateRange}</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <Button variant="secondary">
          <span className="font-medium">Alterar local/data</span>
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  )
}
