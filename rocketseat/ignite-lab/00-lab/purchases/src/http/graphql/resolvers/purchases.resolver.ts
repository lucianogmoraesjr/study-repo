import { UseGuards } from '@nestjs/common'
import { Purchase } from '../models/purchase'
import { PurchasesService } from '../../../services/purchases.service'
import { AuthorizationGuard } from '../../auth/authorization.guard'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Product } from '../models/product'
import { ProductsService } from '../../../services/products.service'
import { CreatePurchaseInput } from '../inputs/create-purchase-input'
import { AuthUser, CurrentUser } from '../../auth/current-user'
import { CustumersService } from '../../../services/custumers.service'

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private custumersService: CustumersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases()
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId)
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let custumer = await this.custumersService.getCustumerByAuthUserId(user.sub)

    if (!custumer) {
      custumer = await this.custumersService.createCustumer({
        authUserId: user.sub,
      })
    }

    return this.purchasesService.createPurchase({
      productId: data.productId,
      custumerId: custumer.id,
    })
  }
}
