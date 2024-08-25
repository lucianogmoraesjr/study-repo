import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { GetActivitiesUseCase } from '../get-activities-use-case'

export function makeGetActivitiesUseCase() {
  const prismaTripsRepository = new PrismaTripsRepository()
  return new GetActivitiesUseCase(prismaTripsRepository)
}
