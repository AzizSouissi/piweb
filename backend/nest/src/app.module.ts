import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayrollModule } from './payroll/payroll.module';
import { DeductionsModule } from './deductions/deductions.module';
import { AllowancesModule } from './allowances/allowances.module';

@Module({
  imports: [PayrollModule, DeductionsModule, AllowancesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
