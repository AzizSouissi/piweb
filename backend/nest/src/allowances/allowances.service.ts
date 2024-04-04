import { Injectable } from '@nestjs/common';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { PrismaService } from 'src/prisma.service';
import { Allowance } from '@prisma/client';

@Injectable()
export class AllowancesService {
  constructor(private readonly prisma: PrismaService) {}

  async createAllowance(
    createAllowanceDto: CreateAllowanceDto,
  ): Promise<Allowance> {
    const { payrollId, description, amount } = createAllowanceDto;
    return this.prisma.allowance.create({
      data: {
        payrollId,
        description,
        amount,
      },
    });
  }

  async findAll(): Promise<Allowance[]> {
    return this.prisma.allowance.findMany();
  }

  async findOne(id: string): Promise<Allowance | string> {
    try {
      const record = await this.prisma.allowance.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          payrollId: true,
          description: true,
          amount: true,
        },
      });

      if (!record) {
        return `Allowance with ID ${id} not found`;
      }

      return record;
    } catch (error) {
      console.error('Error fetching allowance:', error);
      throw new Error('Failed to fetch allowance');
    }
  }

  async update(
    id: string,
    updateAllowanceDto: UpdateAllowanceDto,
  ): Promise<Allowance | any> {
    try {
      const updatedAllowance = await this.prisma.allowance.update({
        where: { id: id },
        data: {
          payrollId: updateAllowanceDto.payrollId,
          description: updateAllowanceDto.description,
          amount: updateAllowanceDto.amount,
        },
        select: {
          id: true,
          payrollId: true,
          description: true,
          amount: true,
        },
      });
      return updatedAllowance;
    } catch (error) {
      console.error('Error updating allowance:', error);
      throw new Error('Failed to update allowance');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.allowance.delete({
        where: {
          id: id,
        },
      });

      return true;
    } catch (error) {
      console.error('Error deleting allowance:', error);
      throw new Error('Failed to delete allowance');
    }
  }
}
