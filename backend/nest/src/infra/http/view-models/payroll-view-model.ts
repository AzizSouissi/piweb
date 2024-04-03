import { Payroll } from '@application/entities/payroll';

export class PayrollViewModel {
  static toHTTP(payroll: Payroll) {
    return {
      id: payroll.id,
      userId: payroll.userId,
      month: payroll.month,
      basicSalary: payroll.basicSalary,
      cnssDeduction: payroll.cnssDeduction,
      taxableSalary: payroll.taxableSalary,
      irpp: payroll.irpp,
      css: payroll.css,
      allowances: payroll.allowances,
      deductions: payroll.deductions,
      netSalary: payroll.netSalary,
    };
  }
}
