import { AllowancesRepository } from './../../../application/repositories/allowances-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAllowance {
  constructor(private allowancesRepository: AllowancesRepository) {}

  async execute(allowanceId: string): Promise<void> {
    await this.allowancesRepository.delete(allowanceId);
  }
}
