import { AttendanceRecord } from './attendanceRecord';
export class Employee {
  id!: string;
  employee_id!: string;
  name!: string;
  job!: string;
  attendanceRecord!: AttendanceRecord[];
}
