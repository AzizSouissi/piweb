import { Deduction } from '@application/entities/deduction';
import { DeductionsRepository } from '@application/repositories/deductions-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateDeduction {
  constructor(private deductionsRepository: DeductionsRepository) {}

  async execute(deduction: Deduction): Promise<void> {
    await this.deductionsRepository.update(deduction);
  }
}
