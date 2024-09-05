import { format } from 'date-fns'
import { CircleCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { api } from '../../lib/axios'

interface Activity {
  date: string
  activities: Array<{
    id: string
    title: string
    occursAt: string
  }>
}

export function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])

  const { tripId } = useParams()

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities))
  }, [tripId])

  return (
    <div className="space-y-8">
      {activities.map((day) => (
        <div key={day.date} className="space-y-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-zinc-300">
              {format(day.date, 'd')}
            </span>
            <span className="text-xs text-zinc-500">
              {format(day.date, 'EEEE')}
            </span>
          </div>

          {day.activities.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhuma atividade cadastrada nessa data.
            </p>
          ) : (
            day.activities.map(({ id, occursAt, title }) => (
              <div key={id} className="space-y-2.5">
                <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-inner-shadow">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">{title}</span>
                  <span className="ml-auto text-sm text-zinc-400">
                    {format(occursAt, 'HH:mm')}h
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  )
}
