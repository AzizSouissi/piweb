import { IsUUID } from 'class-validator';

export class ConfigIdParam {
  @IsUUID()
  configId: string;
}
