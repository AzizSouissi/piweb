import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { Payroll } from '@prisma/client';
import { CreatePayrollDto } from './dto/create-payroll.dto';

@Controller('payrolls')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  async createPayroll(
    @Body() createPayrollDto: CreatePayrollDto,
  ): Promise<Payroll> {
    return this.payrollService.createPayroll(createPayrollDto);
  }

  @Get()
  async getAllPayrolls(): Promise<Payroll[]> {
    return this.payrollService.getAllPayrolls();
  }

  @Get('/month/:month')
  async getPayrollsByMonth(@Param('month') month: Date): Promise<Payroll[]> {
    return this.payrollService.getPayrollsByMonth(new Date(month));
  }

  @Get('/user/:userId')
  async getPayrollsByUserId(
    @Param('userId') userId: string,
  ): Promise<Payroll[]> {
    return this.payrollService.getPayrollsByUserId(userId);
  }
}
