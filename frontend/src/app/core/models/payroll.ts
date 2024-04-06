import { Allowance } from './allowance';
import { Deduction } from './deduction';
import { User } from './user';

export class Payroll {
  id!: string;
  user!: User;
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
