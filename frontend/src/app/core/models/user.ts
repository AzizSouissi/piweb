import { AttendanceRecord } from './attendanceRecord';
import { Project } from './project';
export class User {
  id!: string;
  firstName!: string;
  lastName!: string;
  attendanceRecord!: AttendanceRecord[];
  project!: Project[];
}
