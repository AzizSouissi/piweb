import { Config as RawConfig } from '@prisma/client';
import { Config } from '@application/entities/config';

export class PrismaConfigMapper {
  static toPrisma(config: Config) {
    return {
      id: config.id,
      companyName: config.companyName,
      cnssrib: config.cnssrib,
      payDay: config.payDay,
      delayPayment: config.delayPayment,
      cssrate: config.cssrate,
    };
  }

  static toDomain(raw: RawConfig): Config {
    return new Config({
      id: raw.id,
      companyName: raw.companyName,
      cnssrib: raw.cnssrib,
      payDay: raw.payDay,
      delayPayment: raw.delayPayment,
      cssrate: raw.cssrate,
    });
  }
}
