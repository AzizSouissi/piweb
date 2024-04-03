import { Deduction } from '@application/entities/deduction';
import { DeductionsRepository } from '@application/repositories/deductions-repository';
import { Injectable } from '@nestjs/common';
import { PrismaDeductionMapper } from '../mappers/PrismaDeductionMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaDeductionsRepository implements DeductionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(deduction: Deduction): Promise<void> {
    await this.prisma.deduction.create({
      data: PrismaDeductionMapper.toPrisma(deduction),
    });
  }

  async findAllByPayrollId(payrollId: string): Promise<Deduction[]> {
    const deductions = await this.prisma.deduction.findMany({
      where: {
        payrollId,
      },
    });

    return deductions.map(PrismaDeductionMapper.toDomain);
  }

  async findById(deductionId: string): Promise<Deduction | null> {
    const deduction = await this.prisma.deduction.findUnique({
      where: {
        id: deductionId,
      },
    });

    if (!deduction) {
      return null;
    }

    return PrismaDeductionMapper.toDomain(deduction);
  }

  async update(deduction: Deduction): Promise<void> {
    await this.prisma.deduction.update({
      where: {
        id: deduction.id,
      },
      data: PrismaDeductionMapper.toPrisma(deduction),
    });
  }

  async delete(deductionId: string): Promise<void> {
    await this.prisma.deduction.delete({
      where: {
        id: deductionId,
      },
    });
  }
}
