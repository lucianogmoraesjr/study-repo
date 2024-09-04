import { ArrowRight, UserRoundPlus } from 'lucide-react'

import { Button } from '../../../components/button'

interface InviteGuestsStepProps {
  emailsToInvite: string[]
  onOpenInviteModal: () => void
  onOpenConfirmTripModal: () => void
}

export function InviteGuestsStep({
  emailsToInvite,
  onOpenConfirmTripModal,
  onOpenInviteModal,
}: InviteGuestsStepProps) {
  return (
    <div className="flex h-16 items-center gap-5 rounded-xl bg-zinc-900 px-4 shadow-inner-shadow">
      <div className="flex flex-1 items-center gap-2">
        <UserRoundPlus className="size-5 text-zinc-400" />
        <button
          type="button"
          className="flex-1 text-left outline-none"
          onClick={onOpenInviteModal}
        >
          {emailsToInvite.length > 0 ? (
            <span className="flex-1 text-lg text-zinc-100">
              {emailsToInvite.length === 1
                ? `${emailsToInvite.length} pessoa convidada`
                : `${emailsToInvite.length} pessoas convidadas`}
            </span>
          ) : (
            <span className="flex-1 text-lg text-zinc-400">
              Quem estará na viagem?
            </span>
          )}
        </button>
      </div>

      <Button onClick={onOpenConfirmTripModal} type="submit">
        <span className="font-medium">Confirmar viagem</span>
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}
