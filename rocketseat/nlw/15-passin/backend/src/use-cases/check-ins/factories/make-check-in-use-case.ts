import { PrismaCheckInsRepository } from '../../../repositories/prisma/check-ins-repository'
import { CheckInUseCase } from '../check-in-use-case'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const checkInUseCase = new CheckInUseCase(prismaCheckInsRepository)

  return checkInUseCase
}
