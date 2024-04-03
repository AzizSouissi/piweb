import { Allowance } from '@application/entities/allowance';

export class AllowanceViewModel {
  static toHTTP(allowance: Allowance) {
    return {
      id: allowance.id,
      payrollId: allowance.payrollId,
      description: allowance.description,
      amount: allowance.amount,
    };
  }
}
