import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { GetTripUseCase } from '../get-trip-use-case'

export function makeGetTripUseCase() {
  const prismaTripsRepository = new PrismaTripsRepository()
  return new GetTripUseCase(prismaTripsRepository)
}
