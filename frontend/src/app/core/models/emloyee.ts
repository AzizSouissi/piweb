//import { AttendanceRecord } from '../../../../../piweb-attendanceRecord-Management/frontend/src/app/core/models/attendanceRecord';
import { Task } from './Task';
export class Employee {
  id!: string;
  employee_id!: string;
  name!: string;
  job!: string;
  //attendanceRecord!: AttendanceRecord[];
  tasks! : Task[];
}
