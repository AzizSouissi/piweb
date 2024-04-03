import { Config } from '@application/entities/config';

export class ConfigViewModel {
  static toHTTP(config: Config) {
    return {
      id: config.id,
      companyName: config.companyName,
      cnssrib: config.cnssrib,
      payDay: config.payDay,
      delayPayment: config.delayPayment,
      cssrate: config.cssrate,
    };
  }
}
