import { IsUUID } from 'class-validator';

export class PayrollIdParam {
  @IsUUID()
  payrollId: string;
}
