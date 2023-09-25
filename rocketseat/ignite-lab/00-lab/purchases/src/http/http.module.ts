import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { DatabaseModule } from './../database/database.module'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { ProductsResolver } from './graphql/resolvers/products.resolver'
import { join } from 'node:path'
import { ProductsService } from '../services/products.service'
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver'
import { PurchasesService } from '../services/purchases.service'
import { CustumersService } from '../services/custumers.service'
import { CustumersResolver } from './graphql/resolvers/custumers.resolver'
import { MessagingModule } from '../messaging/messaging.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    PurchasesResolver,
    PurchasesService,
    CustumersResolver,
    CustumersService,
  ],
})
export class HttpModule {}
