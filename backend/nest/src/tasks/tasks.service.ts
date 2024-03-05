import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { Task } from './entities/task.entity';
//import { Task, User } from 'prisma/schema.prisma'; // Assurez-vous d'importer les modèles appropriés

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService){
  }  
  async createTask(createTaskDto: CreateTaskDto): Promise<Task | any> {
    try {
      // Vérifiez si la tâche existe déjà avec le même titre, par exemple
      const existingTask = await this.prisma.task.findFirst({
        where: {
          title: createTaskDto.title,
          //date: currentDate,
        },
      });

      if (existingTask) {
        return {
          message: 'A task with the same title already exists.',
        };
      }

      // Créez la tâche
      const createdTask = await this.prisma.task.create({
        data: {
          title: createTaskDto.title,
          description: createTaskDto.description,
          priority: createTaskDto.priority,
          status: createTaskDto.status,
          createBy: createTaskDto.createBy,
        },
      });

      return createdTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  }

  
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | any> {
    try {
      const updatedTask = await this.prisma.task.update({
        where: { taskId: id }, // Spécifiez quelle tâche mettre à jour en fonction de l'ID
        data: {
          title: updateTaskDto.title,
          description: updateTaskDto.description,
          priority: updateTaskDto.priority,
          status: updateTaskDto.status,
          createBy: updateTaskDto.createBy,
        },
        select: {
          taskId: true,
          title: true,
          description: true,
          priority: true,
          status: true,
          createBy: true,
        },
      });

      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  }

  async removeTask(id: string): Promise<boolean> {
    try {
      const deletedTask = await this.prisma.task.delete({
        where: {
          taskId: id,
        },
      });

      // Si une tâche est renvoyée, la suppression a réussi
      return !!deletedTask;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  }

  async findAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOneTask(id: string): Promise<Task | string> {
    try {
      const task = await this.prisma.task.findUnique({
        where: {
          taskId: id,
        },
        select: {
          taskId: true,
          title: true,
          description: true,
          priority: true,
          status: true,
          createBy: true,
        },
      });

      if (!task) {
        return `Task with ID ${id} not found`;
      }

      return task;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Failed to fetch task');
    }
  }

  async assignTaskTo(taskId: string, userId: string): Promise<Task | null> {
    // Vérifier si la tâche existe
    const task = await this.prisma.task.findUnique({
      where: {
        taskId,
      },
    });

    if (!task) {
      throw new Error(`La tâche avec l'ID ${taskId} n'existe pas.`);
    }

    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new Error(`L'utilisateur avec l'ID ${userId} n'existe pas.`);
    }

    // Mettre à jour la tâche avec l'ID de l'utilisateur assigné
    const updatedTask = await this.prisma.task.update({
      where: {
        taskId,
      },
      data: {
        users: {
          connect: {
            userId,
          },
        },
      },
    });

    return updatedTask;
  }
  }
  

