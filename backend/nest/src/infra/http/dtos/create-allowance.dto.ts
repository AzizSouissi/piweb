import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateAllowanceDto {
  @IsNotEmpty()
  @IsUUID()
  payrollId: string;

  @Length(4, 240)
  description: string;

  @IsNotEmpty()
  amount: number;
}
