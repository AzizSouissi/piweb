import { Deduction } from '@application/entities/deduction';
import { DeductionsRepository } from '@application/repositories/deductions-repository';
import { Injectable } from '@nestjs/common';

interface CreateDeductionInput {
  payrollId: string;
  description: string;
  amount: number;
}

@Injectable()
export class CreateDeduction {
  constructor(private deductionsRepository: DeductionsRepository) {}

  async execute(input: CreateDeductionInput): Promise<void> {
    const deduction = new Deduction({
      payrollId: input.payrollId,
      description: input.description,
      amount: input.amount,
    });

    await this.deductionsRepository.create(deduction);
  }
}
