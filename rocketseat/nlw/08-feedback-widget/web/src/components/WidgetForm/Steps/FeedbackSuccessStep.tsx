import { CloseButton } from '../../CloseButton'

import successImg from '../../../assets/success.svg'

interface FeedbackSuccessStepButtonProps {
  onFeedbackRestartRequested: () => void
}

export function FeedbackSuccessStep({
  onFeedbackRestartRequested,
}: FeedbackSuccessStepButtonProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>

      <div className="flex flex-col items-center py-10 w-[304px]">
        <img src={successImg} alt="Imagem de sucesso" />

        <span className="text-xl mt-2">Agradecemos o feedback!</span>

        <button
          className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
          onClick={onFeedbackRestartRequested}
        >
          Quero enviar outro
        </button>
      </div>
    </>
  )
}
