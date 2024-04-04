import { Injectable } from '@nestjs/common';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { PrismaService } from 'src/prisma.service';
import { Deduction } from '@prisma/client';

@Injectable()
export class DeductionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createDeduction(
    createDeductionDto: CreateDeductionDto,
  ): Promise<Deduction> {
    const { payrollId, description, amount } = createDeductionDto;
    return this.prisma.deduction.create({
      data: {
        payrollId,
        description,
        amount,
      },
    });
  }

  async findAll(): Promise<Deduction[]> {
    return this.prisma.deduction.findMany();
  }

  async findOne(id: string): Promise<Deduction | string> {
    try {
      const record = await this.prisma.deduction.findUnique({
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
        return `Deduction with ID ${id} not found`;
      }

      return record;
    } catch (error) {
      console.error('Error fetching deduction:', error);
      throw new Error('Failed to fetch deduction');
    }
  }

  async update(
    id: string,
    updateDeductionDto: UpdateDeductionDto,
  ): Promise<Deduction | any> {
    try {
      const updatedDeduction = await this.prisma.deduction.update({
        where: { id: id },
        data: {
          payrollId: updateDeductionDto.payrollId,
          description: updateDeductionDto.description,
          amount: updateDeductionDto.amount,
        },
        select: {
          id: true,
          payrollId: true,
          description: true,
          amount: true,
        },
      });
      return updatedDeduction;
    } catch (error) {
      console.error('Error updating deduction:', error);
      throw new Error('Failed to update deduction');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.deduction.delete({
        where: {
          id: id,
        },
      });

      return true;
    } catch (error) {
      console.error('Error deleting deduction:', error);
      throw new Error('Failed to delete deduction');
    }
  }
}
