import { Payroll } from './payroll';

export class Allowance {
  id!: string;
  payroll!: Payroll;
  payrollId!: string;
  description!: string;
  amount!: number;
}
