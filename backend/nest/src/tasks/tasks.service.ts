import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, priority, status, createBy } = createTaskDto;
    return this.prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        createBy,
      }
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: string): Promise<Task | string> {
    try {
      const record = await this.prisma.task.findUnique({
        where: { taskId: id },
        include: { users: true }, // Include any related entities if necessary
      });
        /*select: {
          taskId: true,
          title: true,
          description: true,
          priority: true,
          status: true,
          createBy: true,
        }
      });*/

      if (!record) {
        return "Task with this id : " +id+ " Not found";
      }

      return record;
    } catch (error) {
      console.error("Error fetching task:", error);
      throw new Error("Failed to fetch task");
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | any> {
    try {
      const updatedTask = await this.prisma.task.update({
        where: { taskId: id },
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
        }
      });
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task");
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.task.delete({ where: { taskId: id } });
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
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
