import { AtSign, Plus, X } from 'lucide-react'
import { FormEvent } from 'react'

import { Button } from '../../components/button'

interface InviteGuestModalProps {
  emailsToInvite: string[]
  onAddEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  onRemoveEmailsToInvite: (email: string) => void
  onClose: () => void
}

export function InviteGuestModal({
  emailsToInvite,
  onAddEmailToInvite,
  onRemoveEmailsToInvite,
  onClose,
}: InviteGuestModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-inner-shadow">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>

            <button type="button" onClick={onClose}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((emailToInvite) => (
            <div
              key={emailToInvite}
              className="flex items-center gap-2 rounded-md bg-zinc-800 px-1.5 py-1.5"
            >
              <span>{emailToInvite}</span>
              <button
                type="button"
                onClick={() => onRemoveEmailsToInvite(emailToInvite)}
              >
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <form
          onSubmit={onAddEmailToInvite}
          className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3"
        >
          <div className="flex flex-1 items-center gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="w-full bg-transparent placeholder-zinc-400 outline-none"
            />
          </div>

          <Button>
            <span>Convidar</span>
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
