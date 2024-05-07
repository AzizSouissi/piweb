/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Query,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { MissionsService } from './missions.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { Public } from 'src/auth/common/decorators';
import { Mission } from './schemas/Mission.Shema';
import { User } from '@prisma/client';

@Public()
@Controller('missions')
export class MissionsController {
  constructor(private readonly missionService: MissionsService) {}

  @Post()
  async assignUserToMission(
    @Body() createMissionDto: Mission,
  ): Promise<Mission> {
    return this.missionService.assignUserToMission(createMissionDto);
  }
  @Post('create')
  async createMission(
    @Body() createMissionDto: CreateMissionDto,
  ): Promise<Mission> {
    try {
      return await this.missionService.createMission(createMissionDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:missionId')
  async deleteMission(@Param('missionId') missionId: string): Promise<void> {
    const existingMission = await this.missionService.findById(missionId);
    if (existingMission) {
      await this.missionService.deleteMission(missionId);
    } else {
      throw new HttpException('Mission non trouvée', 404);
    }
  }
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<Mission[]> {
    if (page < 1 || pageSize < 1) {
      throw new HttpException('Invalid page number or page size', 400);
    }
    return this.missionService.findAll(page, pageSize);
  }
  @Put(':missionId')
  async updateMission(
    @Param('missionId') missionId: string,
    @Body() updateMissionDto: UpdateMissionDto,
  ): Promise<Mission> {
    const existingMission = await this.missionService.findById(missionId);

    if (!existingMission) {
      throw new NotFoundException('Mission not found');
    }

    if (updateMissionDto.title) {
      existingMission.title = updateMissionDto.title;
    }
    if (updateMissionDto.description) {
      existingMission.description = updateMissionDto.description;
    }
    if (updateMissionDto.startDate) {
      existingMission.startDate = updateMissionDto.startDate;
    }
    if (updateMissionDto.endDate) {
      existingMission.endDate = updateMissionDto.endDate;
    }

    return existingMission.save();
  }
  @Get('/deletemissions')
  async delemissions(@Query('missions') missions: string[]): Promise<void> {
    console.log(missions);
  }
  @Post(':missionId/assign-client/:clientId')
  async assignClientToMission(
    @Param('missionId') missionId: string,
    @Param('clientId') clientId: string,
  ): Promise<Mission> {
    return this.missionService.assignClientToMission(missionId, clientId);
  }

  @Post('delete-multiple')
  async deleteMultipleMissions(@Body('ids') ids: string[]): Promise<void> {
    try {
      const result = await this.missionService.deleteMultipleMissions(ids);
    } catch (error) {}
  }
  @Get(':missionId/client/:clientId/employees')
  async getEmployeesAssignedToMissionForClient(
    @Param('missionId') missionId: string,
    @Param('clientId') clientId: string,
  ): Promise<any> {
    const mission = await this.missionService.findById(missionId);
    if (mission.client && mission.client.toString() === clientId) {
      const employees = mission.assignedTo;
      return { employees };
    } else {
      throw new HttpException(
        "La mission spécifiée n'a pas ce client attribué",
        404,
      );
    }
  }
  @Post(':clientId')
  async createAndAssignMission(
    @Body() createMissionDto: CreateMissionDto,
    @Param('clientId') clientId: string,
  ) {
    const mission = await this.missionService.createAndAssignMission(
      createMissionDto,
      clientId,
    );
    if (!mission) {
      throw new NotFoundException('Mission non créée');
    }
    return mission;
  }
  @Get('employee/:employeeId')
  async getMissionByEmployeeId(
    @Param('employeeId') employeeId: string,
  ): Promise<Mission> {
    const mission =
      await this.missionService.getMissionByEmployeeId(employeeId);
    console.log(mission);
    if (!mission) {
      throw new NotFoundException('Mission non trouvée pour cet employé');
    }
    return mission;
  }
  @Get('client/:id')
  async getMissionsByClient(
    @Param('id') id_client: string,
  ): Promise<Mission[]> {
    const missions = await this.missionService.getmissionsbyclient(id_client);

    if (!missions || missions.length === 0) {
      throw new NotFoundException(
        'Aucune mission trouvée pour cet client employé',
      );
    }

    return missions;
  }
  @Get('available-users')
  async getAvailableUsers(@Body('date') date: string): Promise<User[]> {
    return this.missionService.getUsersAvailable(date);
  }
}
