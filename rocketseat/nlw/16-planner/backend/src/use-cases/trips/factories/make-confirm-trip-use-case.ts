import { PrismaTripsRepository } from '../../../repositories/prisma/prisma-trips-repository'
import { ConfirmTripUseCase } from '../confirm-trip-use-case'

export function makeConfirmTripUseCase(redirectFn: (url: string) => void) {
  const prismaTripsRepository = new PrismaTripsRepository()
  return new ConfirmTripUseCase(prismaTripsRepository, redirectFn)
}
