import { Employee } from '../emloyee';

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

export class CreateTaskDto {
  title!: string;
  description?: string;
  priority!: TaskPriority;
  status!: TaskStatus;
  createdBy!: string;
 
  name?: string[]; 

  constructor(init?: Partial<CreateTaskDto>) {
    Object.assign(this, init);
  }
}