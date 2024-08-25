import { PrismaActivitiesRepository } from '../../../repositories/prisma/prisma-activities-repository'
import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { CreateActivityUseCase } from '../create-activity-use-case'

export function makeCreateActivityUseCase() {
  const prismaActivitiesRepository = new PrismaActivitiesRepository()
  const prismaTripsRepository = new PrismaTripsRepository()
  return new CreateActivityUseCase(
    prismaActivitiesRepository,
    prismaTripsRepository,
  )
}
