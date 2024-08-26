import { Participant, Prisma } from '@prisma/client'
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

  async create(
    data: Prisma.ParticipantUncheckedCreateInput,
  ): Promise<Participant> {
    const participant = await prisma.participant.create({
      data,
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
