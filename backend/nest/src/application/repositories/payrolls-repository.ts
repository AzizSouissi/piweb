import { Payroll } from '@application/entities/payroll';

export abstract class PayrollsRepository {
  abstract create(payroll: Payroll): Promise<void>;
}
