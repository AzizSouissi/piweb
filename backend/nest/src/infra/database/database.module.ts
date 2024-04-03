import { Module } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { ConfigsRepository } from '@application/repositories/configs-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';
import { PrismaConfigsRepository } from './prisma/repositories/prisma-configs-repository';
import { AllowancesRepository } from '@application/repositories/allowances-repository';
import { PrismaAllowancesRepository } from './prisma/repositories/prisma-allowances-repository';
import { DeductionsRepository } from '@application/repositories/deductions-repository';
import { PrismaDeductionsRepository } from './prisma/repositories/prisma-deductions-repository';
import { PayrollsRepository } from '@application/repositories/payrolls-repository';
import { PrismaPayrollsRepository } from './prisma/repositories/prisma-payrolls-repository';

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
    {
      provide: DeductionsRepository,
      useClass: PrismaDeductionsRepository,
    },
    {
      provide: AllowancesRepository,
      useClass: PrismaAllowancesRepository,
    },
    {
      provide: PayrollsRepository,
      useClass: PrismaPayrollsRepository,
    },
  ],
  exports: [
    NotificationsRepository,
    ConfigsRepository,
    DeductionsRepository,
    AllowancesRepository,
    PayrollsRepository,
  ],
})
export class DatabaseModule {}
