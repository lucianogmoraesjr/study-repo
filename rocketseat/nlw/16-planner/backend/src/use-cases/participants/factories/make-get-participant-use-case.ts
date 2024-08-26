import { PrismaParticipantsRepository } from '../../../repositories/prisma/prisma-participants-repository'
import { GetParticipantUseCase } from '../get-participant-use-case'

export function makeGetParticipantUseCase() {
  const prismaParticipantsRepository = new PrismaParticipantsRepository()
  return new GetParticipantUseCase(prismaParticipantsRepository)
}
