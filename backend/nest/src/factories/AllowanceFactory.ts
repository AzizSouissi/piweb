import { Allowance, AllowanceProps } from '@application/entities/allowance';
import { faker } from '@faker-js/faker';

export class AllowanceFactory {
  static make(props?: Partial<AllowanceProps>): Allowance {
    return new Allowance({
      payrollId: faker.datatype.uuid(),
      description: faker.lorem.sentence(3),
      amount: faker.datatype.float({ min: 100, max: 1000 }),
      ...props,
    });
  }
}
