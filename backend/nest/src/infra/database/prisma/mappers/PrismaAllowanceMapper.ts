import { Allowance as RawAllowance } from '@prisma/client';
import { Allowance } from '@application/entities/allowance';

export class PrismaAllowanceMapper {
  static toPrisma(allowance: Allowance) {
    return {
      id: allowance.id,
      payrollId: allowance.payrollId,
      description: allowance.description,
      amount: allowance.amount,
    };
  }

  static toDomain(raw: RawAllowance): Allowance {
    return new Allowance({
      id: raw.id,
      payrollId: raw.payrollId,
      description: raw.description,
      amount: raw.amount,
    });
  }
}
