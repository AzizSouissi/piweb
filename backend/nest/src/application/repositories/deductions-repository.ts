import { Deduction } from '@application/entities/deduction';

export abstract class DeductionsRepository {
  abstract create(deduction: Deduction): Promise<void>;
  abstract findById(deductionId: string): Promise<Deduction | null>;
  abstract findAllByPayrollId(payrollId: string): Promise<Deduction[]>;
  abstract update(deduction: Deduction): Promise<void>;
  abstract delete(deductionId: string): Promise<void>;
}
