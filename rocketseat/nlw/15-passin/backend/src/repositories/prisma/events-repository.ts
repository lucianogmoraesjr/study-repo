import { Event, Prisma } from '@prisma/client'
import { prismaClient } from '../../lib/prisma-client'
import { EventsRepository, EventWithAttendeeCount } from '../events-repository'

export class PrismaEventsRepository implements EventsRepository {
  async findAll(): Promise<Event[]> {
    const events = await prismaClient.event.findMany()

    return events
  }

  async findById(id: string): Promise<EventWithAttendeeCount | null> {
    const event = await prismaClient.event.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        details: true,
        id: true,
        slug: true,
        maximumAttendees: true,
        _count: {
          select: {
            attendees: true,
          },
        },
      },
    })

    return event
  }

  async findBySlug(slug: string): Promise<Event | null> {
    const event = await prismaClient.event.findUnique({
      where: {
        slug,
      },
    })

    return event
  }

  async create({
    slug,
    title,
    details,
    maximumAttendees,
  }: Prisma.EventCreateInput): Promise<Event> {
    const event = await prismaClient.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug,
      },
    })

    return event
  }
}
