import { ConfigsRepository } from '@application/repositories/configs-repository';
import { Injectable } from '@nestjs/common';

interface DeleteConfigInput {
  configId: string;
}

@Injectable()
export class DeleteConfig {
  constructor(private configRepository: ConfigsRepository) {}

  async execute(input: DeleteConfigInput): Promise<void> {
    const { configId } = input;
    await this.configRepository.delete(configId);
  }
}
