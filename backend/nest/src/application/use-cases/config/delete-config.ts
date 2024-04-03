import { ConfigRepository } from '@application/repositories/config-repository';
import { Injectable } from '@nestjs/common';

interface DeleteConfigInput {
  configId: string;
}

@Injectable()
export class DeleteConfig {
  constructor(private configRepository: ConfigRepository) {}

  async execute(input: DeleteConfigInput): Promise<void> {
    const { configId } = input;
    await this.configRepository.delete(configId);
  }
}
