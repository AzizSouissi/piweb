import { Deduction } from '@application/entities/deduction';

export class DeductionViewModel {
  static toHTTP(deduction: Deduction) {
    return {
      id: deduction.id,
      payrollId: deduction.payrollId,
      description: deduction.description,
      amount: deduction.amount,
    };
  }
}
