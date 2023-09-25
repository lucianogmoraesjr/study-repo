import {
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql'
import { Custumer } from '../models/custumer'
import { CustumersService } from '../../../services/custumers.service'
import { UseGuards } from '@nestjs/common'
import { AuthorizationGuard } from '../../auth/authorization.guard'
import { AuthUser, CurrentUser } from '../../auth/current-user'
import { PurchasesService } from '../../../services/purchases.service'

@Resolver(() => Custumer)
export class CustumersResolver {
  constructor(
    private custumersService: CustumersService,
    private purchasesServices: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Custumer)
  me(@CurrentUser() user: AuthUser) {
    return this.custumersService.getCustumerByAuthUserId(user.sub)
  }

  @ResolveField()
  purchases(@Parent() custumer: Custumer) {
    return this.purchasesServices.listAllPurchasesFromCustumers(custumer.id)
  }

  @ResolveReference()
  resolveReference({ authUserId }: { authUserId: string }) {
    return this.custumersService.getCustumerByAuthUserId(authUserId)
  }
}
