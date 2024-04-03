import { Config } from '@application/entities/config';
import { ConfigsRepository } from '@application/repositories/configs-repository';
import { UpdateConfig } from './update-config';

describe('UpdateConfig', () => {
  let repository: ConfigsRepository;
  let instance: UpdateConfig;

  beforeEach(() => {
    repository = {
      getConfig: jest.fn(),
      updateConfig: jest.fn(),
    };
    instance = new UpdateConfig(repository);
  });

  it('should update the configuration with provided data', async () => {
    const config: Config = {
      id: '1',
      companyName: 'Old Company',
      cnssrib: 'Old CNSSRIB',
      payDay: new Date('2024-04-01'),
      delayPayment: 7,
      cssrate: 0.05,
    };

    repository.getConfig.mockResolvedValue(config);

    const updateInput = {
      companyName: 'New Company',
      cnssrib: 'New CNSSRIB',
      payDay: new Date('2024-04-15'),
      delayPayment: 10,
      cssrate: 0.07,
    };

    await instance.execute(updateInput);

    expect(repository.updateConfig).toHaveBeenCalledWith({
      ...config,
      ...updateInput,
    });
  });

  it('should throw an error if configuration is not found', async () => {
    repository.getConfig.mockResolvedValue(null);

    await expect(instance.execute({})).rejects.toThrowError(
      'Configuration not found',
    );
    expect(repository.updateConfig).not.toHaveBeenCalled();
  });
});
