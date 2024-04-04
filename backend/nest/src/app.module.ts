import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayrollModule } from './payroll/payroll.module';
import { AllowancesModule } from './allowances/allowances.module';
import { DeductionsModule } from './deductions/deductions.module';
import { ConfigsModule } from './configs/configs.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
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
