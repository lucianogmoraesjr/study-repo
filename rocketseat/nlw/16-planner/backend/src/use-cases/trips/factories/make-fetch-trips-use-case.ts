import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { FetchTripsUseCase } from '../fetch-trips-use-case'

export function makeFetchTripsUseCase() {
  const prismaTripsRepository = new PrismaTripsRepository()
  return new FetchTripsUseCase(prismaTripsRepository)
}
