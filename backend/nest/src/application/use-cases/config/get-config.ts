import { Config } from '@application/entities/config';
import { ConfigsRepository } from '@application/repositories/configs-repository';
import { Injectable } from '@nestjs/common';

interface GetConfigOutput {
  config: Config;
}

@Injectable()
export class GetConfig {
  constructor(private configsRepository: ConfigsRepository) {}

  async execute(): Promise<GetConfigOutput> {
    const config = await this.configsRepository.getConfig();
    if (!config) {
      throw new Error('Configuration not found');
    }
    return { config };
  }
}
