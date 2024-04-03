import { Config } from '@application/entities/config';

export abstract class ConfigsRepository {
  abstract create(config: Config): Promise<void>;
  abstract getConfig(): Promise<Config | null>;
  abstract updateConfig(config: Config): Promise<void>;
  abstract delete(configId: string): Promise<void>;
}
