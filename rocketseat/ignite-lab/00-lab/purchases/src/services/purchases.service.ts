import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'
import { KafkaService } from '../messaging/kafka.service'

interface CreatePurchaseParams {
  productId: string
  custumerId: string
}

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  listAllPurchasesFromCustumers(custumerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        custumerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async createPurchase({ custumerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      throw new Error('Product not found.')
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        custumerId,
        productId,
      },
    })

    const custumer = await this.prisma.custumer.findUnique({
      where: { id: custumerId },
    })

    this.kafka.emit('purchases.new-purchase', {
      custumer: {
        authUserId: custumer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    })

    return purchase
  }
}
