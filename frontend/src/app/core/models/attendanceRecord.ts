import { Employee } from './emloyee';

export class AttendanceRecord {
  id!: string;
  date!: string;
  shiftType!: ShiftType | string;
  status!: Status;
  absent_reason?: string | null;

  employeeId!: string;
}

export enum Status {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export enum ShiftType {
  FULL_DAY = 'FULL_DAY',
  HALF_DAY = 'HALF_DAY',
  QUARTER_SHIFT = 'QUARTER_SHIFT',
}
