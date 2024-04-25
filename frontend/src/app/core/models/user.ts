import { AttendanceRecord } from './attendanceRecord';
import { Project } from './project';
export class User {
  id!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  attendanceRecord!: AttendanceRecord[];
  project!: Project[];
  basicSalary!: number;
  offDays!: number;
  familySituation!: string;
  childrenNumber!: number;
  bankrib!: string;
  numCnss!: string;
}
