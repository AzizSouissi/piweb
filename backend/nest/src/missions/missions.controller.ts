import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionService } from './missions.service';
import { Public } from 'src/auth/common/decorators';

@Public()
@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionService) {}

  @Post()
  create(@Body() createMissionDto: any) {
    return this.missionsService.create(createMissionDto);
  }

  
  @Patch('assign')
  async assignUsersToMission(@Body() data : any)
  {
    return this.missionsService.assignUserToMission(data)
  }
 
  @Delete(':id')
  deleteMission(@Param('missionId') missionId: string)
  {
    return this.missionsService.deleteMission(missionId);

  }

  @Patch('assignClientToMission/:id/:idMission')
  assignClientToMission(@Param('clientId') clientId : string,@Param('idMission') idMission : string)
  {
    return this.missionsService.assignClientToMission(clientId,idMission)

  }
}
