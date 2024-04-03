import { Allowance } from '@application/entities/allowance';
import { AllowancesRepository } from '@application/repositories/allowances-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateAllowance {
  constructor(private allowancesRepository: AllowancesRepository) {}

  async execute(allowance: Allowance): Promise<void> {
    await this.allowancesRepository.update(allowance);
  }
}
