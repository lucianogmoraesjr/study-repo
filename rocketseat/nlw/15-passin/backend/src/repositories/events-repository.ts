import { Event, Prisma } from '@prisma/client'

export type EventWithAttendeeCount = Event & {
  _count: {
    attendees: number
  }
}
export interface EventsRepository {
  findAll(): Promise<Event[]>
  findById(id: string): Promise<EventWithAttendeeCount | null>
  findBySlug(slug: string): Promise<Event | null>
  create(data: Prisma.EventCreateInput): Promise<Event>
}
