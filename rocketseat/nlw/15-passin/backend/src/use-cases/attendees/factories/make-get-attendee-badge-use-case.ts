import { PrismaAttendeesRepository } from '../../../repositories/prisma/attendees-repository'
import { GetAttendeeBadgeUseCase } from '../get-attendee-badge-use-case'

export function makeGetAttendeeBadgeUseCase() {
  const prismaAttendeeRepository = new PrismaAttendeesRepository()
  const getAttendeeBadgeUseCase = new GetAttendeeBadgeUseCase(
    prismaAttendeeRepository,
  )

  return getAttendeeBadgeUseCase
}
