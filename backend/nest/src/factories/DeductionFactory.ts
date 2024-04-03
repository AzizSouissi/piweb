import { Deduction, DeductionProps } from '@application/entities/deduction';
import { faker } from '@faker-js/faker';

export class DeductionFactory {
  static make(props?: Partial<DeductionProps>): Deduction {
    return new Deduction({
      payrollId: faker.datatype.uuid(),
      description: faker.lorem.sentence(3),
      amount: faker.datatype.float({ min: 100, max: 1000 }),
      ...props,
    });
  }
}
