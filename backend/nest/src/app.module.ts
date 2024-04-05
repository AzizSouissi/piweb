import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HolidayManagementModule } from './holiday-management/holiday-management.module';
import { DepartmentManagementModule } from './department-management/department-management.module';

@Module({
  imports: [HolidayManagementModule, DepartmentManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
