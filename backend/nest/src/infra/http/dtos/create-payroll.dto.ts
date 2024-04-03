import { Allowance } from '@application/entities/allowance';
import { Deduction } from '@application/entities/deduction';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePayrollDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  month: Date;

  @IsNotEmpty()
  basicSalary: number;

  @IsNotEmpty()
  cnssDeduction: number;

  @IsNotEmpty()
  taxableSalary: number;

  @IsNotEmpty()
  irpp: number;

  @IsNotEmpty()
  css: number;

  allowances: Allowance[];

  deductions: Deduction[];

  @IsNotEmpty()
  netSalary: number;
}
