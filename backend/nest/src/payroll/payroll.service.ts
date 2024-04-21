import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Payroll } from '@prisma/client';

@Injectable()
export class PayrollService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayroll(createPayrollDto: Payroll): Promise<Payroll> {
    const { id, userId, month, cnssdeduction, irpp, css, netSalary } =
      createPayrollDto;

    return this.prisma.payroll.create({
      data: {
        id,
        userId,
        month,
        cnssdeduction,
        irpp,
        css,
        netSalary,
      },
    });
  }

  async getAllPayrolls(): Promise<Payroll[]> {
    return this.prisma.payroll.findMany();
  }

  async getPayrollsByMonth(month: Date): Promise<Payroll[]> {
    return this.prisma.payroll.findMany({
      where: {
        month: month,
      },
    });
  }

  async getPayrollsByUserId(userId: string): Promise<Payroll[]> {
    return this.prisma.payroll.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
