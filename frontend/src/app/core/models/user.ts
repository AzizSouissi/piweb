import { AttendanceRecord } from './attendanceRecord';
import { Project } from './project';
export class User {
  id!: string;
  firstname!: string;
  lastname!: string;
  attendanceRecord!: AttendanceRecord[];
  project!: Project[];
}
