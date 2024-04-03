import { Allowance } from '@application/entities/allowance';

export abstract class AllowancesRepository {
  abstract create(allowance: Allowance): Promise<void>;
  abstract findById(allowanceId: string): Promise<Allowance | null>;
  abstract findAllByPayrollId(payrollId: string): Promise<Allowance[]>;
  abstract update(allowance: Allowance): Promise<void>;
  abstract delete(allowanceId: string): Promise<void>;
}
