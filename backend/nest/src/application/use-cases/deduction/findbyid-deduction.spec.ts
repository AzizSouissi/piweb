import { Config } from '@application/entities/config';
import { ConfigsRepository } from '@application/repositories/configs-repository';
import { GetConfig } from './get-config';

describe('GetConfig', () => {
  let repository: ConfigsRepository;
  let instance: GetConfig;

  beforeEach(() => {
    repository = {
      getConfig: jest.fn(),
    };
    instance = new GetConfig(repository);
  });

  it('should return the configuration if found', async () => {
    const config: Config = {
      id: '1',
      companyName: 'Company',
      cnssrib: 'CNSSRIB',
      payDay: new Date('2024-04-01'),
      delayPayment: 7,
      cssrate: 0.05,
    };

    repository.getConfig.mockResolvedValue(config);

    const result = await instance.execute();

    expect(result).toEqual({ config });
  });

  it('should throw an error if configuration is not found', async () => {
    repository.getConfig.mockResolvedValue(null);

    await expect(instance.execute()).rejects.toThrowError(
      'Configuration not found',
    );
  });
});
