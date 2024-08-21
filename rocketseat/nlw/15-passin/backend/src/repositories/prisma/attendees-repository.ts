import { Attendee, Prisma } from '@prisma/client'
import { prismaClient } from '../../lib/prisma-client'
import { AttendeesRepository } from '../attendees-repository'

export class PrismaAttendeesRepository implements AttendeesRepository {
  async create(data: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee> {
    const attendee = await prismaClient.attendee.create({
      data,
    })

    return attendee
  }

  async findById(id: number): Promise<Pick<Attendee, 'email' | 'name'> | null> {
    const attendee = await prismaClient.attendee.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
      },
    })

    return attendee
  }

  async findByEmailAndEventId({
    email,
    eventId,
  }: Prisma.AttendeeEventIdEmailCompoundUniqueInput): Promise<Attendee | null> {
    const attendee = await prismaClient.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId,
        },
      },
    })

    return attendee
  }

  async countAttendeesForEvent(eventId: string): Promise<number> {
    const amount = await prismaClient.attendee.count({
      where: {
        eventId,
      },
    })

    return amount
  }
}
