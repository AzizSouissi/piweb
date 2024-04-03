import { Allowance } from '@application/entities/allowance';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import { AllowanceViewModel } from '../view-models/allowance-view-model';
import { AllowancesRepository } from '@application/repositories/allowances-repository';

@Controller('allowances')
export class AllowancesController {
  constructor(private allowancesRepository: AllowancesRepository) {}

  @Post()
  async create(@Body() allowance: Allowance) {
    await this.allowancesRepository.create(allowance);
    return { message: 'Allowance created successfully' };
  }

  @Get(':allowanceId')
  async findById(@Param('allowanceId') allowanceId: string) {
    const allowance = await this.allowancesRepository.findById(allowanceId);
    if (!allowance) {
      throw new Error('Allowance not found');
    }
    return { allowance: AllowanceViewModel.toHTTP(allowance) };
  }

  @Get('payroll/:payrollId')
  async findAllByPayrollId(@Param('payrollId') payrollId: string) {
    const allowances =
      await this.allowancesRepository.findAllByPayrollId(payrollId);
    return { allowances: allowances.map(AllowanceViewModel.toHTTP) };
  }

  @Patch()
  async update(@Body() allowance: Allowance) {
    await this.allowancesRepository.update(allowance);
    return { message: 'Allowance updated successfully' };
  }

  @Delete(':allowanceId')
  async delete(@Param('allowanceId') allowanceId: string) {
    await this.allowancesRepository.delete(allowanceId);
    return { message: 'Allowance deleted successfully' };
  }
}
