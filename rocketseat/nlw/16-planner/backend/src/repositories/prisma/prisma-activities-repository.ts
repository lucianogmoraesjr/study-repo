import { Activity, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { ActivitiesRepository } from '../activities-repository'

export class PrismaActivitiesRepository implements ActivitiesRepository {
  async create(data: Prisma.ActivityUncheckedCreateInput): Promise<Activity> {
    const activity = await prisma.activity.create({
      data,
    })

    return activity
  }
}
