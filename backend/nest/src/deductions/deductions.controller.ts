import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { Deduction } from '@prisma/client';
import { DeductionsService } from './deductions.service';

@Controller('deductions')
export class DeductionsController {
  constructor(private readonly deductionsService: DeductionsService) {}

  @Post()
  async createDeduction(
    @Body() createDeductionDto: CreateDeductionDto,
  ): Promise<Deduction> {
    return this.deductionsService.createDeduction(createDeductionDto);
  }

  @Get()
  findAll() {
    return this.deductionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deductionsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeductionDto: UpdateDeductionDto,
  ) {
    return this.deductionsService.update(id, updateDeductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deductionsService.remove(id);
  }
}
