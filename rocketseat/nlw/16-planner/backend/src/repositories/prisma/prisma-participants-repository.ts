import { Participant } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import {
  ParticipantsRepository,
  UpdateParticipant,
} from '../participants-repository'

export class PrismaParticipantsRepository implements ParticipantsRepository {
  async findById(id: string): Promise<Participant | null> {
    const participant = await prisma.participant.findUnique({
      where: {
        id,
      },
    })

    return participant
  }

  async update(data: UpdateParticipant): Promise<Participant> {
    const participant = await prisma.participant.update({
      where: {
        id: data.id,
      },
      data,
    })

    return participant
  }
}
