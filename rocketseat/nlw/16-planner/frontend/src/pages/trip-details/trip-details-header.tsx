import { Calendar, MapPin, Settings2 } from 'lucide-react'

import { Button } from '../../components/button'

export function TripDetailsHeader() {
  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-6 shadow-inner-shadow">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">Porto Alegre, Brasil</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">17 a 23 de agosto</span>
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
