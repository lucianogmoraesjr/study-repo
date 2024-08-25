import { Link, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { LinksRepository } from '../links-repository'

export class PrismaLinksRepository implements LinksRepository {
  async create(data: Prisma.LinkUncheckedCreateInput): Promise<Link> {
    const trip = await prisma.link.create({
      data,
    })

    return trip
  }
}
