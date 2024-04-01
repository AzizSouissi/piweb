import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { PayrollModule } from './payroll/payroll.module';
import { DeductionsModule } from './deductions/deductions.module';
import { AllowancesModule } from './allowances/allowances.module';

@Module({
  imports: [
    PayrollModule,
    DeductionsModule,
    AllowancesModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
