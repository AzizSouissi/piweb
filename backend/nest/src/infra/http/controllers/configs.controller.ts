import { Config } from '@application/entities/config';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import { ConfigViewModel } from '../view-models/config-view-model';
import { ConfigsRepository } from '@application/repositories/configs-repository';

@Controller('configs')
export class ConfigsController {
  constructor(private configsRepository: ConfigsRepository) {}

  @Post()
  async create(@Body() config: Config) {
    await this.configsRepository.create(config);
    return { message: 'Config created successfully' };
  }

  @Get()
  async getConfig() {
    const config = await this.configsRepository.getConfig();
    return { config: ConfigViewModel.toHTTP(config) };
  }

  @Patch()
  async updateConfig(@Body() config: Config) {
    await this.configsRepository.updateConfig(config);
    return { message: 'Config updated successfully' };
  }

  @Delete(':configId')
  async delete(@Param('configId') configId: string) {
    await this.configsRepository.delete(configId);
    return { message: 'Config deleted successfully' };
  }
}
