import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { DatabaseModule } from './../database/database.module'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { join } from 'node:path'
import { CoursesResolver } from './graphql/resolvers/courses.resolver'
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver'
import { StudentsResolver } from './graphql/resolvers/students.resolver'
import { EnrollmentsService } from '../services/enrollments.service'
import { StudentsService } from '../services/students.service'
import { CoursesService } from '../services/courses.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CoursesResolver,
    CoursesService,
    EnrollmentsResolver,
    EnrollmentsService,
    StudentsResolver,
    StudentsService,
  ],
})
export class HttpModule {}
