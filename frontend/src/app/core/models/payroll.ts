import { Allowance } from './allowance';
import { Deduction } from './deduction';

export class Payroll {
  id!: string;

  userId!: string;
  month!: Date;
  basicSalary!: number;
  cnssdeduction!: number;
  taxableSalary!: number;
  irpp!: number;
  css!: number;
  allowances!: Allowance[];
  deductions!: Deduction[];
  netSalary!: number;
}
