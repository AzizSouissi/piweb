import { AttendanceRecord } from './attendanceRecord';
export class User {
  id!: string;
  firstname!: string;
  lastname!: string;
  attendanceRecord!: AttendanceRecord[];
}
