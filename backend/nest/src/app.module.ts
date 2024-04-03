import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HolidayManagementModule } from './holiday-management/holiday-management.module';

@Module({
  imports: [HolidayManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
