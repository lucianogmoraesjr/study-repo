import { Event, Prisma } from '@prisma/client'
import { prismaClient } from '../../lib/prisma-client'
import { EventsRepository } from '../events-repository'

export class PrismaEventsRepository implements EventsRepository {
  async findAll(): Promise<Event[]> {
    const events = await prismaClient.event.findMany()

    return events
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
