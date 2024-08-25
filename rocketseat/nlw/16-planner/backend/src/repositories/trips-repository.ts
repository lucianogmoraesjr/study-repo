import { Prisma, Trip } from '@prisma/client'

export type CreateTrip = Omit<Prisma.TripCreateInput, 'participants'> & {
  ownerName: string
  ownerEmail: string
  emailsToInvite?: string[]
}

export type UpdateTrip = Omit<Prisma.TripUpdateInput, 'id'> & {
  id: string
}

export type TripWithParticipants = Prisma.TripGetPayload<{
  include: {
    participants: {
      where: {
        isOwner: false
      }
    }
  }
}>

export type TripWithActivities = Prisma.TripGetPayload<{
  include: {
    activities: true
  }
}>

export type TripWithLinks = Prisma.TripGetPayload<{
  include: {
    links: true
  }
}>

export interface TripsRepository {
  findAll(): Promise<Trip[]>
  findById(id: string): Promise<TripWithParticipants | null>
  findTripActivities(id: string): Promise<TripWithActivities | null>
  findTripLinks(id: string): Promise<TripWithLinks | null>
  create(data: CreateTrip): Promise<Trip>
  update(data: UpdateTrip): Promise<Trip>
}
