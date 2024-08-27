import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  UserRoundPlus,
  X,
} from 'lucide-react'
import { FormEvent, useState } from 'react'

export function App() {
  const [isInviteInputOpen, setIsInviteInputOpen] = useState(false)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    'johndoe@mail.com',
  ])

  function handleOpenInviteInput() {
    setIsInviteInputOpen(true)
  }

  function handleCloseInviteInput() {
    setIsInviteInputOpen(false)
  }

  function handleOpenInviteModal() {
    setIsInviteModalOpen(true)
  }

  function handleCloseInviteModal() {
    setIsInviteModalOpen(false)
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

  return (
    <div className="bg-bg-pattern flex h-screen items-center justify-center bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" />

          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex h-16 items-center gap-5 rounded-xl bg-zinc-900 px-4 shadow-inner-shadow">
            <div className="flex flex-1 items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />
              <input
                disabled={isInviteInputOpen}
                placeholder="Para onde você vai?"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                disabled={isInviteInputOpen}
                placeholder="Quando?"
                className="w-28 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="h-6 w-px bg-zinc-800" />

            {isInviteInputOpen ? (
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2 text-zinc-200 hover:bg-zinc-700"
                onClick={handleCloseInviteInput}
              >
                <span className="font-medium">Alterar local/data</span>
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 text-lime-950 hover:bg-lime-400"
                onClick={handleOpenInviteInput}
              >
                <span className="font-medium">Continuar</span>
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isInviteInputOpen && (
            <div className="flex h-16 items-center gap-5 rounded-xl bg-zinc-900 px-4 shadow-inner-shadow">
              <div className="flex flex-1 items-center gap-2">
                <UserRoundPlus className="size-5 text-zinc-400" />
                <button
                  type="button"
                  className="flex-1 bg-transparent text-left text-lg text-zinc-400 outline-none"
                  onClick={handleOpenInviteModal}
                >
                  Quem estará na viagem?
                </button>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 text-lime-950 hover:bg-lime-400"
              >
                <span className="font-medium">Confirmar viagem</span>
                <ArrowRight className="size-5" />
              </button>
            </div>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-inner-shadow">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>

                <button type="button" onClick={handleCloseInviteModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>

              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
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
                    onClick={() => handleRemoveEmailToInvite(emailToInvite)}
                  >
                    <X className="size-4 text-zinc-400" />
                  </button>
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-zinc-800" />

            <form
              onSubmit={handleAddEmailToInvite}
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

              <button className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950">
                <span>Convidar</span>
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
