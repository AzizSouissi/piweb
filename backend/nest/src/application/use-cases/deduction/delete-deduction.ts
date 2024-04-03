import { DeductionsRepository } from '@application/repositories/deductions-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteDeduction {
  constructor(private deductionsRepository: DeductionsRepository) {}

  async execute(deductionId: string): Promise<void> {
    await this.deductionsRepository.delete(deductionId);
  }
}
