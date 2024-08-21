import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<void>
  findByAttendee(id: number): Promise<CheckIn | null>
}
