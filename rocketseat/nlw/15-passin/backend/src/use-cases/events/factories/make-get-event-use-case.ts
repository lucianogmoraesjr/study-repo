import { PrismaEventsRepository } from '../../../repositories/prisma/events-repository'
import { GetEventUseCase } from '../get-event-use-case'

export function makeGetEventUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const getEventUseCase = new GetEventUseCase(prismaEventsRepository)

  return getEventUseCase
}
