import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Payroll } from '@prisma/client';

@Injectable()
export class PayrollService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayroll(createPayrollDto: Payroll): Promise<Payroll> {
    const {
      userId,
      month,
      taxableSalary,
      cnssdeduction,
      irpp,
      css,
      netSalary,
    } = createPayrollDto;

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
    const targetMonth = month.getMonth() + 1; // JavaScript months are 0-indexed, Prisma uses 1-indexed months
    const year = month.getFullYear();
    const firstDayOfMonth = new Date(year, targetMonth - 1, 1);
    const lastDayOfMonth = new Date(year, targetMonth, 0); // 0 as the day will give the last day of the previous month
    return this.prisma.payroll.findMany({
      where: {
        month: {
          // Using Prisma's date filtering functions to filter by a specific month
          gte: firstDayOfMonth,
          lt: lastDayOfMonth,
        },
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
