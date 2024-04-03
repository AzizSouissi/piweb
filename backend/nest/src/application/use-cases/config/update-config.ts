import { ConfigsRepository } from '@application/repositories/configs-repository';
import { Injectable } from '@nestjs/common';

interface UpdateConfigInput {
  companyName?: string;
  cnssrib?: string;
  payDay?: Date;
  delayPayment?: number;
  cssrate?: number;
}

@Injectable()
export class UpdateConfig {
  constructor(private configsRepository: ConfigsRepository) {}

  async execute(input: UpdateConfigInput): Promise<void> {
    const config = await this.configsRepository.getConfig();
    if (!config) {
      throw new Error('Configuration not found');
    }

    if (input.companyName !== undefined) {
      config.companyName = input.companyName;
    }

    if (input.cnssrib !== undefined) {
      config.cnssrib = input.cnssrib;
    }

    if (input.payDay !== undefined) {
      config.payDay = input.payDay;
    }

    if (input.delayPayment !== undefined) {
      config.delayPayment = input.delayPayment;
    }

    if (input.cssrate !== undefined) {
      config.cssrate = input.cssrate;
    }

    await this.configsRepository.updateConfig(config);
  }
}
