import { Allowance } from '@application/entities/allowance';
import { AllowancesRepository } from '@application/repositories/allowances-repository';
import { Injectable } from '@nestjs/common';

interface CreateAllowanceInput {
  payrollId: string;
  description: string;
  amount: number;
}

@Injectable()
export class CreateAllowance {
  constructor(private allowancesRepository: AllowancesRepository) {}

  async execute(input: CreateAllowanceInput): Promise<void> {
    const allowance = new Allowance({
      payrollId: input.payrollId,
      description: input.description,
      amount: input.amount,
    });

    await this.allowancesRepository.create(allowance);
  }
}
