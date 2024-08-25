import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { GetLinksUseCase } from '../get-links-use-case'

export function makeGetLinksUseCase() {
  const prismaTripsRepository = new PrismaTripsRepository()
  return new GetLinksUseCase(prismaTripsRepository)
}
