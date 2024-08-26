import { Participant, Prisma } from '@prisma/client'

export type UpdateParticipant = Omit<Prisma.ParticipantUpdateInput, 'id'> & {
  id: string
}

export interface ParticipantsRepository {
  findById(id: string): Promise<Participant | null>
  create(data: Prisma.ParticipantUncheckedCreateInput): Promise<Participant>
  update(data: UpdateParticipant): Promise<Participant>
}
