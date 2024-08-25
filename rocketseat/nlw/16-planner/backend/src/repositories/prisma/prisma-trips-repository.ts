import { Trip } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import {
  CreateTrip,
  TripsRepository,
  TripWithActivities,
  TripWithLinks,
  TripWithParticipants,
  UpdateTrip,
} from '../trips-repository'

export class PrismaTripsRepository implements TripsRepository {
  async findAll(): Promise<Trip[]> {
    const trips = await prisma.trip.findMany()

    return trips
  }

  async findById(id: string): Promise<TripWithParticipants | null> {
    const trip = await prisma.trip.findFirst({
      where: {
        id,
      },
      include: {
        participants: {
          where: {
            isOwner: false,
          },
        },
      },
    })

    return trip
  }

  async findTripActivities(id: string): Promise<TripWithActivities | null> {
    const trip = await prisma.trip.findUnique({
      where: {
        id,
      },
      include: {
        activities: {
          orderBy: {
            occursAt: 'asc',
          },
        },
      },
    })

    return trip
  }

  async findTripLinks(id: string): Promise<TripWithLinks | null> {
    const trip = await prisma.trip.findUnique({
      where: {
        id,
      },
      include: {
        links: true,
      },
    })

    return trip
  }

  async create({
    destination,
    endsAt,
    startsAt,
    ownerEmail,
    ownerName,
    emailsToInvite,
  }: CreateTrip): Promise<Trip> {
    const trip = await prisma.trip.create({
      data: {
        destination,
        endsAt,
        startsAt,
        participants: emailsToInvite
          ? {
              createMany: {
                data: [
                  {
                    email: ownerEmail,
                    name: ownerName,
                    isConfirmed: true,
                    isOwner: true,
                  },
                  ...emailsToInvite.map((email) => ({ email })),
                ],
              },
            }
          : {
              create: {
                email: ownerEmail,
                name: ownerName,
                isConfirmed: true,
                isOwner: true,
              },
            },
      },
    })

    return trip
  }

  async update(data: UpdateTrip): Promise<Trip> {
    const trip = await prisma.trip.update({
      data,
      where: {
        id: data.id,
      },
    })

    return trip
  }
}
