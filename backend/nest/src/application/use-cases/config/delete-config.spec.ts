import { ConfigRepository } from '@application/repositories/config-repository';
import { DeleteConfig } from './delete-config';

describe('DeleteConfig', () => {
  let repository: ConfigRepository;
  let instance: DeleteConfig;

  beforeEach(() => {
    repository = new ConfigRepository();
    instance = new DeleteConfig(repository);
  });

  it('should delete a configuration', async () => {
    // Mock the delete method of the repository and test the deletion functionality
  });
});
