export class Task {
    taskId !: string;
    title !: string;
    description!: string;
    priority!: TaskPriority;
    status!: TaskStatus;
    createBy!: string;
    createdAt!: Date;
    updatedAt!: Date;
    //usersIDs!: string[];
    //users!: User[];
}

export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

export enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
}
