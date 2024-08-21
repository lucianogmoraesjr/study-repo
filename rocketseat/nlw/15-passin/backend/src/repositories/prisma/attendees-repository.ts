import { Attendee, Prisma } from '@prisma/client'
import { prismaClient } from '../../lib/prisma-client'
import {
  AttendeesRepository,
  AttendeeWithCheckIn,
  AttendeeWithEvent,
  FindAllByEventData,
} from '../attendees-repository'

export class PrismaAttendeesRepository implements AttendeesRepository {
  async create(data: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee> {
    const attendee = await prismaClient.attendee.create({
      data,
    })

    return attendee
  }

  async findById(id: number): Promise<AttendeeWithEvent | null> {
    const attendee = await prismaClient.attendee.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        event: {
          select: {
            title: true,
          },
        },
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

  async findAllByEvent({
    eventId,
    pageIndex,
    query,
  }: FindAllByEventData): Promise<AttendeeWithCheckIn[]> {
    const attendees = await prismaClient.attendee.findMany({
      where: {
        eventId,
        name: query && {
          contains: query,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        checkIn: {
          select: {
            createdAt: true,
          },
        },
      },
      take: 10,
      skip: pageIndex * 10,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return attendees
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
