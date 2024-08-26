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

export type TripWithAllParticipants = Prisma.TripGetPayload<{
  include: {
    participants: {
      select: {
        id: true
        email: true
        name: true
        isConfirmed: true
      }
    }
  }
}>

export type TripDetails = Prisma.TripGetPayload<{
  select: {
    id: true
    destination: true
    startsAt: true
    endsAt: true
    isConfirmed: true
  }
}>

export interface TripsRepository {
  findAll(): Promise<Trip[]>
  findById(id: string): Promise<TripWithParticipants | null>
  findTripActivities(id: string): Promise<TripWithActivities | null>
  findTripLinks(id: string): Promise<TripWithLinks | null>
  findTripParticipants(id: string): Promise<TripWithAllParticipants | null>
  findTripDetails(id: string): Promise<TripDetails | null>
  create(data: CreateTrip): Promise<Trip>
  update(data: UpdateTrip): Promise<Trip>
}
