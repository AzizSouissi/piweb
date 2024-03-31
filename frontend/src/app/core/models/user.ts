import { AttendanceRecord } from './attendanceRecord';
export class User {
  id!: string;
  firstName!: string;
  lastName!: string;
  attendanceRecord!: AttendanceRecord[];
}
