import { Payroll } from './payroll';

export class Deduction {
  id!: string;
  payroll!: Payroll;
  payrollId!: string;
  description!: string;
  amount!: number;
}
