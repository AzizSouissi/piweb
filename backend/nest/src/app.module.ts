import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceTrackingModule } from './attendance-tracking/attendance-tracking.module';
import { ProjectManagementModule } from './project-management/project-management.module';

@Module({
  imports: [AttendanceTrackingModule, ProjectManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
