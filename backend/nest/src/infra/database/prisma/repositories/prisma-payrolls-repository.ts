import { Injectable } from '@nestjs/common';
import { Payroll } from '@application/entities/payroll';
import { PayrollsRepository } from '@application/repositories/payrolls-repository';
import { PrismaService } from '../prisma.service';
import { PrismaPayrollMapper } from '../mappers/PrismaPayrollMapper';

@Injectable()
export class PrismaPayrollsRepository implements PayrollsRepository {
  constructor(private prisma: PrismaService) {}

  async create(payroll: Payroll): Promise<void> {
    await this.prisma.payroll.create({
      data: PrismaPayrollMapper.toPrisma(payroll),
    });
  }
}
