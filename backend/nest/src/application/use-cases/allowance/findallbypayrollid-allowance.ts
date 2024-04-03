import { Allowance } from '@application/entities/allowance';
import { AllowancesRepository } from '@application/repositories/allowances-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllByPayrollIdAllowance {
  constructor(private allowancesRepository: AllowancesRepository) {}

  async execute(payrollId: string): Promise<Allowance[]> {
    return this.allowancesRepository.findAllByPayrollId(payrollId);
  }
}
