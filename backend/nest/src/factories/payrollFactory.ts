import { Payroll, PayrollProps } from '@application/entities/payroll';
import { faker } from '@faker-js/faker';

export class PayrollFactory {
  static make(props?: Partial<PayrollProps>): Payroll {
    return new Payroll({
      userId: faker.datatype.uuid(),
      month: faker.date.recent(),
      basicSalary: faker.datatype.float({ min: 1000, max: 5000 }),
      cnssDeduction: faker.datatype.float({ min: 100, max: 500 }),
      taxableSalary: faker.datatype.float({ min: 900, max: 4500 }),
      irpp: faker.datatype.float({ min: 50, max: 200 }),
      css: faker.datatype.float({ min: 50, max: 200 }),
      allowances: [],
      deductions: [],
      netSalary: faker.datatype.float({ min: 800, max: 4000 }),
      ...props,
    });
  }
}
