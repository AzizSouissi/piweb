import { Module } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { ConfigsRepository } from '@application/repositories/configs-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';
import { PrismaConfigsRepository } from './prisma/repositories/prisma-configs-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: ConfigsRepository,
      useClass: PrismaConfigsRepository,
    },
  ],
  exports: [NotificationsRepository, ConfigsRepository],
})
export class DatabaseModule {}
