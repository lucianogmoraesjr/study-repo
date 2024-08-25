import { PrismaParticipantsRepository } from '../../../repositories/prisma/prisma-participants-repository'
import { ConfirmParticipantUseCase } from '../confirm-participant-use-case'

export function makeConfirmParticipantUseCase(
  redirectFn: (url: string) => void,
) {
  const prismaParticipantsRepository = new PrismaParticipantsRepository()
  return new ConfirmParticipantUseCase(prismaParticipantsRepository, redirectFn)
}
