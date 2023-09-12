import { Popover } from '@headlessui/react'
import { X } from '@phosphor-icons/react'

export function CloseButton() {
  return (
    <Popover.Button
      className="top-5 right-5 absolute text-sinc-400 hover:text-zinc-100"
      title="Fechar feedback"
    >
      <X weight="bold" className="w-4 h-4" />
    </Popover.Button>
  )
}
