import { Config } from '@application/entities/config';
import { ConfigsRepository } from '@application/repositories/configs-repository';
import { Injectable } from '@nestjs/common';
import { PrismaConfigMapper } from '../mappers/PrismaConfigMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaConfigsRepository implements ConfigsRepository {
  constructor(private prisma: PrismaService) {}

  async create(config: Config): Promise<void> {
    await this.prisma.config.create({
      data: PrismaConfigMapper.toPrisma(config),
    });
  }

  async getConfig(): Promise<Config | null> {
    const config = await this.prisma.config.findFirst();
    if (!config) {
      return null;
    }
    return PrismaConfigMapper.toDomain(config);
  }

  async updateConfig(config: Config): Promise<void> {
    await this.prisma.config.update({
      where: { id: config.id },
      data: PrismaConfigMapper.toPrisma(config),
    });
  }

  async delete(configId: string): Promise<void> {
    await this.prisma.config.delete({
      where: { id: configId },
    });
  }
}
