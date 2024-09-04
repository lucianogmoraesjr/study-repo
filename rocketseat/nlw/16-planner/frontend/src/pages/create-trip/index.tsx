import { FormEvent, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { ConfirmTripModal } from './confirm-trip-modal'
import { InviteGuestModal } from './invite-guest-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export function CreateTripPage() {
  const [isInviteGuestsStepOpen, setIsInviteGuestsStepOpen] = useState(false)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventDate, setEventDate] = useState<DateRange | undefined>()
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    'johndoe@mail.com',
  ])

  function handleOpenInviteGuestsStep() {
    setIsInviteGuestsStepOpen(true)
  }

  function handleCloseInviteGuestsStep() {
    setIsInviteGuestsStepOpen(false)
  }

  function handleOpenInviteModal() {
    setIsInviteModalOpen(true)
  }

  function handleCloseInviteModal() {
    setIsInviteModalOpen(false)
  }

  function handleOpenConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function handleCloseConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function handleAddEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite((prevState) => prevState.concat(email))

    event.currentTarget.reset()
  }

  function handleRemoveEmailToInvite(email: string) {
    setEmailsToInvite((prevState) => prevState.filter((item) => item !== email))
  }

  function handleConfirmTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log({
      ownerName,
      ownerEmail,
      eventDate,
      emailsToInvite,
    })
  }

  return (
    <div className="flex h-screen items-center justify-center bg-bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" />

          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isInviteInputOpen={isInviteGuestsStepOpen}
            eventDate={eventDate}
            onDateChange={setEventDate}
            onCloseInviteInput={handleCloseInviteGuestsStep}
            onOpenInviteInput={handleOpenInviteGuestsStep}
          />

          {isInviteGuestsStepOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              onOpenConfirmTripModal={handleOpenConfirmTripModal}
              onOpenInviteModal={handleOpenInviteModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
          <br /> com nossos{' '}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isInviteModalOpen && (
        <InviteGuestModal
          emailsToInvite={emailsToInvite}
          onAddEmailToInvite={handleAddEmailToInvite}
          onRemoveEmailsToInvite={handleRemoveEmailToInvite}
          onClose={handleCloseInviteModal}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          ownerEmail={ownerEmail}
          ownerName={ownerName}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
          onClose={handleCloseConfirmTripModal}
          onSubmit={handleConfirmTrip}
        />
      )}
    </div>
  )
}
