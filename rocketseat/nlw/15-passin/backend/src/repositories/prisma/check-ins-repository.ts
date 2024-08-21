import { CheckIn, Prisma } from '@prisma/client'
import { prismaClient } from '../../lib/prisma-client'
import { CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create({
    attendeeId,
  }: Prisma.CheckInUncheckedCreateInput): Promise<void> {
    await prismaClient.checkIn.create({
      data: {
        attendeeId,
      },
    })
  }

  async findByAttendee(attendeeId: number): Promise<CheckIn | null> {
    const attendeeCheckIn = await prismaClient.checkIn.findUnique({
      where: {
        attendeeId,
      },
    })

    return attendeeCheckIn
  }
}
