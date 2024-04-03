import { Payroll } from '@application/entities/payroll';

export class PrismaPayrollMapper {
  static toPrisma(payroll: Payroll) {
    return {
      id: payroll.id,
      userId: payroll.userId,
      month: payroll.month,
      basicSalary: payroll.basicSalary,
      cnssdeduction: payroll.cnssDeduction,
      taxableSalary: payroll.taxableSalary,
      irpp: payroll.irpp,
      css: payroll.css,
      allowances: {
        // Map each allowance to its own object
        create: payroll.allowances.map((allowance) => ({
          description: allowance.description,
          amount: allowance.amount,
        })),
      },
      deductions: {
        // Map each deduction to its own object
        create: payroll.deductions.map((deduction) => ({
          description: deduction.description,
          amount: deduction.amount,
        })),
      },
      netSalary: payroll.netSalary,
    };
  }
}
