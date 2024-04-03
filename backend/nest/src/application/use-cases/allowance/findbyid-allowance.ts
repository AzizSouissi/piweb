import { Allowance } from '@application/entities/allowance';
import { AllowancesRepository } from '@application/repositories/allowances-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdAllowance {
  constructor(private allowancesRepository: AllowancesRepository) {}

  async execute(allowanceId: string): Promise<Allowance | null> {
    return this.allowancesRepository.findById(allowanceId);
  }
}
