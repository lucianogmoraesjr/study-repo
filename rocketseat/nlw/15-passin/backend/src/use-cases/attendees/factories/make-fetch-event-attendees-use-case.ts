import { PrismaAttendeesRepository } from '../../../repositories/prisma/attendees-repository'
import { FetchEventAttendeesUseCase } from '../fetch-event-attendees-use-case'

export function makeFetchEventAttendeesUseCase() {
  const prismaAttendeesRepository = new PrismaAttendeesRepository()
  const fetchEventAttendeesUseCase = new FetchEventAttendeesUseCase(
    prismaAttendeesRepository,
  )

  return fetchEventAttendeesUseCase
}
