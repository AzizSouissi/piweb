import { Config } from '../../entities/config';
import { InMemoryConfigsRepository } from '../../../../test/repositories/in-memory-configs-repository';
import { CreateConfig } from './get-config';

describe('Create Config', () => {
  let repository: InMemoryConfigsRepository;
  let instance: CreateConfig;

  beforeEach(() => {
    repository = new InMemoryConfigsRepository();
    instance = new CreateConfig(repository);
  });

  it('should be able create a config', async () => {
    const { config } = await instance.execute({
      companyName: 'Example Company',
      cnssrib: 'example-cnssrib',
      payDay: new Date(),
      delayPayment: 7,
      cssrate: 0.05,
    });

    expect(repository.configs).toHaveLength(1);
    expect(repository.configs[0]).toBeInstanceOf(Config);
    expect(repository.configs[0]).toEqual(config);
  });
});
