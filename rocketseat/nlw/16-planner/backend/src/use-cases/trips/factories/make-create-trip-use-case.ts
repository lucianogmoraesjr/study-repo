import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { CreateTripUseCase } from '../create-trip-use-case'

export function makeCreateTripUseCase() {
  const prismaTripsRepository = new PrismaTripsRepository()
  return new CreateTripUseCase(prismaTripsRepository)
}
