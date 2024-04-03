
import { IsNotEmpty, IsEnum } from 'class-validator';

export enum TaskStatus{
    PENDING ='PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED ='COMPLETED',
}
export enum TaskPriority {
    LOW='LOW',
    MEDIUM ='MEDIUM',
    HIGH='HIGH',
  }

export class CreateTaskDto {
    @IsNotEmpty()
    title: String;

    description?: string;
    
    @IsEnum(TaskPriority)
    priority: TaskPriority;
    
    @IsEnum(TaskPriority)
    status: TaskStatus;
    
    @IsNotEmpty()
    createBy: string;
      
  }



