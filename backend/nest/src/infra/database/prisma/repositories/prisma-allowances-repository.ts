import { Allowance } from '@application/entities/allowance';
import { AllowancesRepository } from '@application/repositories/allowances-repository';
import { Injectable } from '@nestjs/common';
import { PrismaAllowanceMapper } from '../mappers/PrismaAllowanceMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAllowancesRepository implements AllowancesRepository {
  constructor(private prisma: PrismaService) {}

  async create(allowance: Allowance): Promise<void> {
    await this.prisma.allowance.create({
      data: PrismaAllowanceMapper.toPrisma(allowance),
    });
  }

  async findAllByPayrollId(payrollId: string): Promise<Allowance[]> {
    const allowances = await this.prisma.allowance.findMany({
      where: {
        payrollId,
      },
    });

    return allowances.map(PrismaAllowanceMapper.toDomain);
  }

  async findById(allowanceId: string): Promise<Allowance | null> {
    const allowance = await this.prisma.allowance.findUnique({
      where: {
        id: allowanceId,
      },
    });

    if (!allowance) {
      return null;
    }

    return PrismaAllowanceMapper.toDomain(allowance);
  }

  async update(allowance: Allowance): Promise<void> {
    await this.prisma.allowance.update({
      where: {
        id: allowance.id,
      },
      data: PrismaAllowanceMapper.toPrisma(allowance),
    });
  }

  async delete(allowanceId: string): Promise<void> {
    await this.prisma.allowance.delete({
      where: {
        id: allowanceId,
      },
    });
  }
}
