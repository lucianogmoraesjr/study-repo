import { Mail, User, X } from 'lucide-react'
import { FormEvent } from 'react'

import { Button } from '../../components/button'

interface ConfirmTripModalProps {
  ownerName: string
  ownerEmail: string
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmTripModal({
  onClose,
  onSubmit,
  ownerEmail,
  ownerName,
  setOwnerEmail,
  setOwnerName,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-inner-shadow">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação da viagem
            </h2>

            <button type="button" onClick={onClose}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">
              Florianópolis, Brasil
            </span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">
              16 a 27 de Agosto de 2024
            </span>{' '}
            preencha seus dados abaixo:
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-between gap-3"
        >
          <div className="flex w-full flex-col gap-2">
            <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <User className="size-5 text-zinc-400" />
              <input
                type="text"
                name="name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full bg-transparent placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Mail className="size-5 text-zinc-400" />
              <input
                type="email"
                name="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                placeholder="Seu e-mail pessoal"
                className="w-full bg-transparent placeholder-zinc-400 outline-none"
              />
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
