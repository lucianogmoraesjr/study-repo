import { PrismaEventsRepository } from '../../../repositories/prisma/events-repository'
import { FetchEventsUseCase } from '../fetch-events-use-case'

export function makeFetchEventsUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const fetchEventsUseCase = new FetchEventsUseCase(prismaEventsRepository)

  return fetchEventsUseCase
}
