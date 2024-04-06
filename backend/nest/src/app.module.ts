import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { PasswordresetModule } from './passwordreset/passwordreset.module';
import { AttendanceTrackingModule } from './attendance-tracking/attendance-tracking.module';
import { HolidayManagementModule } from './holiday-management/holiday-management.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { PayrollModule } from './payroll/payroll.module';
import { AllowancesModule } from './allowances/allowances.module';
import { DeductionsModule } from './deductions/deductions.module';
import { ConfigsModule } from './configs/configs.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    AttendanceTrackingModule,
    AuthModule,
    PrismaModule,
    RolesModule,
    UsersModule,
    PasswordresetModule,

    HolidayManagementModule,
    TasksModule,
    ProjectManagementModule,
    PayrollModule,
    AllowancesModule,
    DeductionsModule,
    ConfigsModule,
    ConfigsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
