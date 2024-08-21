import { Attendee, Prisma } from '@prisma/client'

export type AttendeeWithEvent = Prisma.AttendeeGetPayload<{
  select: {
    email: true
    name: true
    event: {
      select: {
        title: true
      }
    }
  }
}>

export type AttendeeWithCheckIn = Prisma.AttendeeGetPayload<{
  select: {
    id: true
    name: true
    email: true
    createdAt: true
    checkIn: {
      select: {
        createdAt: true
      }
    }
  }
}>

export interface FindAllByEventData {
  eventId: string
  pageIndex: number
  query?: string
}

export interface AttendeesRepository {
  create(data: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee>
  findById(id: number): Promise<AttendeeWithEvent | null>
  findByEmailAndEventId(
    data: Prisma.AttendeeEventIdEmailCompoundUniqueInput,
  ): Promise<Attendee | null>
  findAllByEvent(data: FindAllByEventData): Promise<AttendeeWithCheckIn[]>
  countAttendeesForEvent(eventId: string): Promise<number>
}
