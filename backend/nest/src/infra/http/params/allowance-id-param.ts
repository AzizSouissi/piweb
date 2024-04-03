import { IsUUID } from 'class-validator';

export class AllowanceIdParam {
  @IsUUID()
  allowanceId: string;
}
