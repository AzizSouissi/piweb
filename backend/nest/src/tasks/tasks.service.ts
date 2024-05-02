import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {  Prisma, Task, TaskPriority } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: Task): Promise<Task> {
    try {
      const { title, description, priority, status, createBy, assignedToEmail } = createTaskDto;

      // Find the user by their email
      const assignedUser = await this.prisma.user.findUnique({
        where: {
          email: assignedToEmail, // Use assignedToEmail to find the user by their email
        },
      });

      if (!assignedUser) {
        throw new Error(`The user with email '${assignedToEmail}' does not exist.`);
      }

      // Create the task and connect it to the user
      const createdTask = await this.prisma.task.create({
        data: {
          title,
          description,
          priority,
          status,
          createBy,
          assignedTo: {
            connect: {
              email: assignedToEmail, // Connect the task to the user by their email
            },
          },
        },
        include: {
          assignedTo: true, // Include the assigned user information in the response
        },
      });

      return createdTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  }


  async update(title: string, updateTaskDto: Task): Promise<Task | any> {
    try {
      const updatedTask = await this.prisma.task.update({
        where: { title: title },
        data: {
          title: updateTaskDto.title,
          description: updateTaskDto.description,
          priority: updateTaskDto.priority ,
          status: updateTaskDto.status  ,
          createBy: updateTaskDto.createBy,
        },
        select: {
          id: true,
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


  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.task.delete({ where: { id: id } });
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  }

  async assignTaskTo(title: string, assignedToEmail: string): Promise<Task | null> {
    try {
    // Vérifier si la tâche existe
    const task = await this.prisma.task.findUnique({
      where: {
        title,
      },
    });

    if (!task) {
      throw new Error(`La tâche avec le titre ${title} n'existe pas.`);
    }

    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: {
        email: assignedToEmail,
      },
    });

    if (!user) {
      throw new Error(`L'utilisateur avec l'email ${assignedToEmail} n'existe pas.`);
    }

    // Mettre à jour la tâche avec l'email de l'utilisateur assigné
    const updatedTask = await this.prisma.task.update({
      where: {
        title, // Assuming title is used to uniquely identify the task
      },
      data: {
        assignedTo: {
          connect: {
            email :  assignedToEmail ,   }, 
        },
      },
    });

    return updatedTask;
  }
  catch (error) {
    console.error('Error assigning task:', error);
    throw new Error('Failed to assign task');
  }
}

    async findOne(title: string): Promise<Task | string> {
    try {
      const record = await this.prisma.task.findFirst({
        where: { title: title }, // Search for the task by its title
        include: { assignedTo: true }, // Include any related entities if necessary
      });
  
      if (!record) {
        return 'Task with this title: ' + title + ' Not found';
      }
  
      return record;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Failed to fetch task');
    }
  }
  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }
}
 

  
  /*async findOne(id: string): Promise<Task | string> {
    try {
      const record = await this.prisma.task.findUnique({
        where: { id: id },
        include: { users: true }, // Include any related entities if necessary
      });
      /*select: {
          id: true,
          title: true,
          description: true,
          priority: true,
          status: true,
          createBy: true,
        }
      });

      if (!record) {
        return 'Task with this id : ' + id + ' Not found';
      }

      return record;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Failed to fetch task');
    }
  }*/
