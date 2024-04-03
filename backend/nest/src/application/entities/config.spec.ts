import generate from 'bson-objectid';
import { Config } from './config';

describe('Config', () => {
  it('should create a config', () => {
    const config = new Config({
      companyName: 'Company XYZ',
      cnssrib: '123456789',
      payDay: new Date(),
      delayPayment: 3,
      cssrate: 0.25,
    });

    expect(config).toBeTruthy();
  });

  it('should create a config with all props', () => {
    const data = {
      id: generate().toHexString(),
      companyName: 'Company XYZ',
      cnssrib: '123456789',
      payDay: new Date(),
      delayPayment: 3,
      cssrate: 0.25,
    };

    const config = new Config(data);

    expect(config.id).toBe(data.id);
    expect(config.companyName).toBe(data.companyName);
    expect(config.cnssrib).toBe(data.cnssrib);
    expect(config.payDay).toBe(data.payDay);
    expect(config.delayPayment).toBe(data.delayPayment);
    expect(config.cssrate).toBe(data.cssrate);
  });
});
