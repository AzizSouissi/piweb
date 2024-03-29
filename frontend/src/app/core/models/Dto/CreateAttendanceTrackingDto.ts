import { ShiftType } from '../attendanceRecord';
import { Employee } from '../emloyee';

export enum Status {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export class CreateAttendanceTrackingDto {
  date!: string;
  shiftType!: ShiftType | string | null;
  status!: Status;
  absent_reason?: string | null;
  employeeId!: string;
}
