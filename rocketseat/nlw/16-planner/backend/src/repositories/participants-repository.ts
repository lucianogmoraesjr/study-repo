import { Participant, Prisma } from '@prisma/client'

export type UpdateParticipant = Omit<Prisma.ParticipantUpdateInput, 'id'> & {
  id: string
}

export interface ParticipantsRepository {
  findById(id: string): Promise<Participant | null>
  update(data: UpdateParticipant): Promise<Participant>
}
