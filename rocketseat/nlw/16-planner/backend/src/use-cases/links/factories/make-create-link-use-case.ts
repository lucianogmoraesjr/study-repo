import { PrismaLinksRepository } from '../../../repositories/prisma/prisma-links-repository'
import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { CreateLinkUseCase } from '../create-link-use-case'

export function makeCreateLinkUseCase() {
  const prismaLinksRepository = new PrismaLinksRepository()
  const prismaTripsRepository = new PrismaTripsRepository()
  return new CreateLinkUseCase(prismaLinksRepository, prismaTripsRepository)
}
