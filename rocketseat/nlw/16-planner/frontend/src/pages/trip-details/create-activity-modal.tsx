import { parse } from 'date-fns'
import { Calendar, Clock, Tag, X } from 'lucide-react'
import { FormEvent, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'

interface CreateActivityModalProps {
  onClose: () => void
}

export function CreateActivityModal({ onClose }: CreateActivityModalProps) {
  const { tripId } = useParams()

  const timeInputRef = useRef<HTMLInputElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const title = formData.get('title')
    const date = formData.get('date')
    const time = formData.get('time')

    const dateTime = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date())

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occursAt: dateTime.toISOString(),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-inner-shadow">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

            <button type="button" onClick={onClose}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-between gap-3"
        >
          <div className="flex w-full flex-col gap-2">
            <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Tag className="size-5 text-zinc-400" />
              <input
                name="title"
                placeholder="Qual a atividade?"
                className="w-full bg-transparent placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
                <Calendar className="size-5 text-zinc-400" />
                <input
                  ref={dateInputRef}
                  type="date"
                  name="date"
                  onClick={() => dateInputRef.current?.showPicker()}
                  defaultValue={new Date().toLocaleDateString('en-CA')}
                  className="w-full bg-transparent placeholder-zinc-400 outline-none"
                />
              </div>

              <div className="flex h-14 w-36 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
                <Clock className="size-5 text-zinc-400" />
                <input
                  ref={timeInputRef}
                  onClick={() => timeInputRef.current?.showPicker()}
                  type="time"
                  name="time"
                  defaultValue={new Date().toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  className="w-full bg-transparent placeholder-zinc-400 outline-none"
                />
              </div>
            </div>
          </div>

          <Button size="full">
            <span>Confirmar criação da viagem</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
