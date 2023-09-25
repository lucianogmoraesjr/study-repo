import { Injectable } from '@nestjs/common'

import { PrismaService } from '../database/prisma/prisma.service'

interface CreateCustumerParams {
  authUserId: string
}

@Injectable()
export class CustumersService {
  constructor(private prisma: PrismaService) {}

  getCustumerByAuthUserId(authUserId: string) {
    return this.prisma.custumer.findUnique({
      where: {
        authUserId,
      },
    })
  }

  async createCustumer({ authUserId }: CreateCustumerParams) {
    return this.prisma.custumer.create({
      data: {
        authUserId,
      },
    })
  }
}
