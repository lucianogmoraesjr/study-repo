import { PrismaEventsRepository } from '../../../repositories/prisma/events-repository'
import { CreateEventUseCase } from '../create-event-use-case'

export function makeCreateEventUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const createEventUseCase = new CreateEventUseCase(prismaEventsRepository)

  return createEventUseCase
}
