import { User } from './user';

export class Project {
  id?: string;
  usersIds!: String[];
  users?: User[];
  leader!: String;
  startDate!: String;
  endDate!: String;
  projectStatus!: ProjectStatus;
}

export enum ProjectStatus {
  NEW = 'NEW',
  RUNNING = 'RUNNING',
  ON_HOLD = 'ON_HOLD',
  FINISHED = 'FINISHED',
}
