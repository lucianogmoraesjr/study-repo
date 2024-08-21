import { Attendee, Prisma } from '@prisma/client'

export interface AttendeesRepository {
  create(data: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee>
  findById(id: number): Promise<Pick<Attendee, 'email' | 'name'> | null>
  findByEmailAndEventId(
    data: Prisma.AttendeeEventIdEmailCompoundUniqueInput,
  ): Promise<Attendee | null>
  countAttendeesForEvent(eventId: string): Promise<number>
}
