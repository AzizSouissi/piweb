import { Deduction } from '@application/entities/deduction';
import { DeductionsRepository } from '@application/repositories/deductions-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdDeduction {
  constructor(private deductionsRepository: DeductionsRepository) {}

  async execute(deductionId: string): Promise<Deduction | null> {
    return this.deductionsRepository.findById(deductionId);
  }
}
