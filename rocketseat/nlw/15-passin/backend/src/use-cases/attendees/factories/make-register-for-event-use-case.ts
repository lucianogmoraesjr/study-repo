import { PrismaAttendeesRepository } from '../../../repositories/prisma/attendees-repository'
import { PrismaEventsRepository } from '../../../repositories/prisma/events-repository'
import { RegisterForEventUseCase } from '../register-for-event-use-case'

export function makeRegisterForEventUseCase() {
  const prismaAttendeesRepository = new PrismaAttendeesRepository()
  const prismaEventsRepository = new PrismaEventsRepository()
  const registerForEventUseCase = new RegisterForEventUseCase(
    prismaAttendeesRepository,
    prismaEventsRepository,
  )

  return registerForEventUseCase
}
