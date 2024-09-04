import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../../components/button'

import { Activities } from './activities'
import { CreateActivityModal } from './create-activity-modal'
import { Guests } from './guests'
import { ImportantLinks } from './important-links'
import { TripDetailsHeader } from './trip-details-header'

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false)

  function handleOpenCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function handleCloseCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <TripDetailsHeader />

      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button onClick={handleOpenCreateActivityModal}>
              <Plus className="size-5" />
              <span>Cadastrar atividade</span>
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />

          <div className="h-px w-full bg-zinc-800" />

          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal onClose={handleCloseCreateActivityModal} />
      )}
    </div>
  )
}
