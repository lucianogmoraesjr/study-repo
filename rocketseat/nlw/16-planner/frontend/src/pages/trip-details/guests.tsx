import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'

interface Participant {
  id: string
  name: string | null
  email: string
  isConfirmed: boolean
}

export function Guests() {
  const [participants, setParticipants] = useState<Participant[] | undefined>(
    [],
  )

  const { tripId } = useParams()

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants?.map(({ email, id, name, isConfirmed }, i) => (
          <div key={id} className="flex items-center justify-between">
            <div className="max-w-60 space-y-1.5">
              <span className="block text-zinc-100">
                {name ?? `Convidado ${i}`}
              </span>
              <span className="block truncate text-sm text-zinc-400">
                {email}
              </span>
            </div>
            {isConfirmed ? (
              <CheckCircle2 className="size-5 shrink-0 text-lime-300" />
            ) : (
              <CircleDashed className="size-5 shrink-0 text-zinc-400" />
            )}
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        <span className="font-medium">Gerenciar convidados</span>
      </Button>
    </div>
  )
}
