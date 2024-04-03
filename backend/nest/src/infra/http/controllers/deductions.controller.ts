import { Deduction } from '@application/entities/deduction';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import { DeductionViewModel } from '../view-models/deduction-view-model';
import { DeductionsRepository } from '@application/repositories/deductions-repository';

@Controller('deductions')
export class DeductionsController {
  constructor(private deductionsRepository: DeductionsRepository) {}

  @Post()
  async create(@Body() deduction: Deduction) {
    await this.deductionsRepository.create(deduction);
    return { message: 'Deduction created successfully' };
  }

  @Get(':deductionId')
  async findById(@Param('deductionId') deductionId: string) {
    const deduction = await this.deductionsRepository.findById(deductionId);
    if (!deduction) {
      throw new Error('Deduction not found');
    }
    return { deduction: DeductionViewModel.toHTTP(deduction) };
  }

  @Get('payroll/:payrollId')
  async findAllByPayrollId(@Param('payrollId') payrollId: string) {
    const deductions =
      await this.deductionsRepository.findAllByPayrollId(payrollId);
    return { deductions: deductions.map(DeductionViewModel.toHTTP) };
  }

  @Patch()
  async update(@Body() deduction: Deduction) {
    await this.deductionsRepository.update(deduction);
    return { message: 'Deduction updated successfully' };
  }

  @Delete(':deductionId')
  async delete(@Param('deductionId') deductionId: string) {
    await this.deductionsRepository.delete(deductionId);
    return { message: 'Deduction deleted successfully' };
  }
}
