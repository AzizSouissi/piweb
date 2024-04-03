import { Config } from '../../entities/config';
import { ConfigsRepository } from './../../../application/repositories/configs-repository';
import { Injectable } from '@nestjs/common';

interface CreateConfigInput {
  companyName: string;
  cnssrib: string;
  payDay: Date;
  delayPayment: number;
  cssrate: number;
}

interface CreateConfigOutput {
  config: Config;
}

@Injectable()
export class CreateConfig {
  constructor(private configsRepository: ConfigsRepository) {}

  async execute(input: CreateConfigInput): Promise<CreateConfigOutput> {
    const config = new Config({
      companyName: input.companyName,
      cnssrib: input.cnssrib,
      payDay: input.payDay,
      delayPayment: input.delayPayment,
      cssrate: input.cssrate,
    });

    await this.configsRepository.create(config);

    return { config };
  }
}
