import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConfigDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  cnssrib: string;

  @IsNotEmpty()
  payDay: Date;

  @IsNotEmpty()
  delayPayment: number;

  @IsNotEmpty()
  cssrate: number;
}
