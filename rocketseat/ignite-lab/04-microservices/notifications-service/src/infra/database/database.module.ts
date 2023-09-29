import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaNotificationsRepositories } from './prisma/repositories/prisma-notifications-repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepositories,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
