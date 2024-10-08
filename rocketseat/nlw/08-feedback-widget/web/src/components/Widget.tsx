import { Popover } from '@headlessui/react'
import { ChatTeardropDots } from '@phosphor-icons/react'
import { WidgetForm } from './WidgetForm'

export function Widget() {
  return (
    <Popover className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>

      <Popover.Button
        type="button"
        className="bg-brand-500 rounded-full px-3 h-12 flex items-center text-white group"
      >
        <ChatTeardropDots className="w-6 h-6 text-white" />

        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2"></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  )
}
