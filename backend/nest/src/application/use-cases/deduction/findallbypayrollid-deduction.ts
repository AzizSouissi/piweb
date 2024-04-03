import { Deduction } from '@application/entities/deduction';
import { DeductionsRepository } from '@application/repositories/deductions-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllByPayrollIdDeduction {
  constructor(private deductionsRepository: DeductionsRepository) {}

  async execute(payrollId: string): Promise<Deduction[]> {
    return this.deductionsRepository.findAllByPayrollId(payrollId);
  }
}
