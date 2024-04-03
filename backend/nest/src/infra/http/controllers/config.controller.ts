import { CancelConfig } from '@application/use-cases/config/cancel-config';
import { CreateConfig } from '@application/use-cases/config/create-config';
import { GetConfigs } from '@application/use-cases/config/get-configs';
import { ReadConfig } from '@application/use-cases/config/read-config';
import { UnreadConfig } from '@application/use-cases/config/unread-config';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateConfigDto } from '../dtos/create-config.dto';
import { ConfigIdParam } from '../params/config-id-param';
import { ConfigViewModel } from '../view-models/config-view-model';

@Controller('configs')
export class ConfigsController {
  constructor(
    private createConfig: CreateConfig,
    private getConfigs: GetConfigs,
    private readConfig: ReadConfig,
    private unreadConfig: UnreadConfig,
    private cancelConfig: CancelConfig,
  ) {}

  @Post()
  async create(@Body() data: CreateConfigDto) {
    const { config } = await this.createConfig.execute(data);

    return { config: ConfigViewModel.toHTTP(config) };
  }

  @Get()
  async getAllConfigs() {
    const configs = await this.getConfigs.execute();

    return { configs: configs.map(ConfigViewModel.toHTTP) };
  }

  @Patch(':configId/read')
  async readConfigFromId(@Param() { configId }: ConfigIdParam) {
    await this.readConfig.execute({ configId });
  }

  @Patch(':configId/unread')
  async unreadConfigFromId(@Param() { configId }: ConfigIdParam) {
    await this.unreadConfig.execute({ configId });
  }

  @Patch(':configId/cancel')
  async cancelConfigFromId(@Param() { configId }: ConfigIdParam) {
    await this.cancelConfig.execute({ configId });
  }
}
