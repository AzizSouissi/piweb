import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceTrackingModule } from './attendance-tracking/attendance-tracking.module';

@Module({
  imports: [AttendanceTrackingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
