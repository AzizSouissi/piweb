import { Deduction as RawDeduction } from '@prisma/client';
import { Deduction } from '@application/entities/deduction';

export class PrismaDeductionMapper {
  static toPrisma(deduction: Deduction) {
    return {
      id: deduction.id,
      payrollId: deduction.payrollId,
      description: deduction.description,
      amount: deduction.amount,
    };
  }

  static toDomain(raw: RawDeduction): Deduction {
    return new Deduction({
      id: raw.id,
      payrollId: raw.payrollId,
      description: raw.description,
      amount: raw.amount,
    });
  }
}
