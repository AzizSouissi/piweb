import { PartialType } from '@nestjs/mapped-types';
import { CreateHolidayManagementDto } from './create-holiday-management.dto';

export class UpdateHolidayManagementDto extends PartialType(CreateHolidayManagementDto) {}
