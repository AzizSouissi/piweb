import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Payroll } from '@prisma/client';

@Injectable()
export class PayrollService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayroll(createPayrollDto: Payroll): Promise<Payroll> {
    const { userId, month, taxableSalary, cnssdeduction, irpp, css, netSalary } =
      createPayrollDto;

    return this.prisma.payroll.create({
      data: {
        userId,
        month,
        taxableSalary,
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

  findAllUsers(): Promise<any> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        address: true,
        birthday: true,
        basicSalary: true,
        offDays: true,
        payrolls: true,
        allowances: true,
        deductions: true,
        familySituation: true,
        childrenNumber: true,
        bankrib: true,
        numCnss: true,
      },
    });
  }
}
