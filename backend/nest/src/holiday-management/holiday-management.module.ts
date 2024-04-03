import { Module } from '@nestjs/common';
import { HolidayManagementService } from './holiday-management.service';
import { HolidayManagementController } from './holiday-management.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HolidayManagementController],
  providers: [HolidayManagementService,PrismaService],
})
export class HolidayManagementModule {}
