import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { Allowance } from '@prisma/client';
import { AllowancesService } from './allowances.service';

@Controller('allowances')
export class AllowancesController {
  constructor(private readonly allowancesService: AllowancesService) {}

  @Post()
  async createAllowance(
    @Body() createAllowanceDto: CreateAllowanceDto,
  ): Promise<Allowance> {
    return this.allowancesService.createAllowance(createAllowanceDto);
  }

  @Get()
  findAll() {
    return this.allowancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allowancesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAllowanceDto: UpdateAllowanceDto,
  ) {
    return this.allowancesService.update(id, updateAllowanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allowancesService.remove(id);
  }
}
