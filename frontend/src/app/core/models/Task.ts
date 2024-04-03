import { Employee } from './emloyee';

export class Task {
  taskId!: string;
  title!: string;
  description?: string | null;
  priority!: TaskPriority;
  status!: TaskStatus;
  createdBy!: string;
  createdAt!: Date;
  updatedAt!: Date;
  dueDate!: Date;
  assignedTo!:string[];

  constructor(init?: Partial<Task>) {
    Object.assign(this, init);
  }
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
