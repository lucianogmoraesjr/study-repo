import { Event, Prisma } from '@prisma/client'

export interface EventsRepository {
  findAll(): Promise<Event[]>
  create(data: Prisma.EventCreateInput): Promise<Event>
}
