import { PrismaParticipantsRepository } from '../../../repositories/prisma/prisma-participants-repository'
import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { InviteParticipantUseCase } from '../invite-participant-use-case'

export function makeInviteParticipantUseCase() {
  const prismaTripsRepository = new PrismaTripsRepository()
  const prismaParticipantsRepository = new PrismaParticipantsRepository()
  return new InviteParticipantUseCase(
    prismaTripsRepository,
    prismaParticipantsRepository,
  )
}
