import { Prisma, Trip } from '@prisma/client'

export type CreateTrip = Omit<Prisma.TripCreateInput, 'participants'> & {
  ownerName: string
  ownerEmail: string
  emailsToInvite?: string[]
}

export interface TripsRepository {
  findAll(): Promise<Trip[]>
  create(data: CreateTrip): Promise<Trip>
}
