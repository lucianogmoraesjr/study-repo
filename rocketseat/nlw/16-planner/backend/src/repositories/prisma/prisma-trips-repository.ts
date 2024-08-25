import { Trip } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { CreateTrip, TripsRepository } from '../trips-repository'

export class PrismaTripsRepository implements TripsRepository {
  async findAll(): Promise<Trip[]> {
    const trips = await prisma.trip.findMany()

    return trips
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
}
