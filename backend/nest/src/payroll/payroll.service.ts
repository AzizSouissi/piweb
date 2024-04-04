import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Payroll } from '@prisma/client';
import { CreatePayrollDto } from './dto/create-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayroll(createPayrollDto: CreatePayrollDto): Promise<Payroll> {
    const {
      userId,
      month,
      basicSalary,
      cnssdeduction,
      taxableSalary,
      irpp,
      css,
      allowances,
      deductions,
      netSalary,
    } = createPayrollDto;

    return this.prisma.payroll.create({
      data: {
        userId,
        month,
        basicSalary,
        cnssdeduction,
        taxableSalary,
        irpp,
        css,
        netSalary,
        allowances: {
          createMany: {
            data: allowances,
          },
        },
        deductions: {
          createMany: {
            data: deductions,
          },
        },
      },
    });
  }

  async getAllPayrolls(): Promise<Payroll[]> {
    return this.prisma.payroll.findMany({
      include: {
        allowances: true,
        deductions: true,
      },
    });
  }

  async getPayrollsByMonth(month: Date): Promise<Payroll[]> {
    return this.prisma.payroll.findMany({
      where: {
        month: month,
      },
      include: {
        allowances: true,
        deductions: true,
      },
    });
  }

  async getPayrollsByUserId(userId: string): Promise<Payroll[]> {
    return this.prisma.payroll.findMany({
      where: {
        userId: userId,
      },
      include: {
        allowances: true,
        deductions: true,
      },
    });
  }
}
