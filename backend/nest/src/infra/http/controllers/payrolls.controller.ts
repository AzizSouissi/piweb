import { Body, Controller, Post } from '@nestjs/common';
import { CreatePayrollDto } from '../dtos/create-payroll.dto';
import { CreatePayroll } from '@application/use-cases/payroll/create-payroll';

@Controller('payrolls')
export class PayrollsController {
  constructor(private createPayroll: CreatePayroll) {}

  @Post()
  async create(@Body() data: CreatePayrollDto) {
    const payroll = await this.createPayroll.execute(data);
    return { payroll };
  }
}
