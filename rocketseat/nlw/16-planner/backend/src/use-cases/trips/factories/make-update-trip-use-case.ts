import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { UpdateTripUseCase } from '../update-trip-use-case'

export function makeUpdateTripUseCase() {
  const prismaTripsRepository = new PrismaTripsRepository()
  return new UpdateTripUseCase(prismaTripsRepository)
}
