import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { GetParticipantsUseCase } from '../get-participants-use-case'

export function makeGetParticipantsUseCase() {
  const prismaTripsRepository = new PrismaTripsRepository()
  return new GetParticipantsUseCase(prismaTripsRepository)
}
