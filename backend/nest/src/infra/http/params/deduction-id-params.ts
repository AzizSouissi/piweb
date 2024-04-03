import { IsUUID } from 'class-validator';

export class DeductionIdParam {
  @IsUUID()
  deductionId: string;
}
