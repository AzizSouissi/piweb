import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MissionService {
 
 
  constructor(private prisma : PrismaService){}

  async getAllMissions() {
    return await this.prisma.mission.findMany()
  }

  async assignUserToMission(data: any) {
    await this.prisma.mission.update(
    {

        where : {
          id : data.id
        },
        data : {

          userId : data.userId
        }
    }
   )
  }

  async create(mission: any) {
    await this.prisma.mission.create({
      data :
      {
        title : mission.title,
        description : mission.description,
        startDate : mission.startDate,
        endDate : mission.endDate,
        status : "PENDING",

      }
    })
  }

  async assignClientToMission(clientId: string, idMission: string) {
    await this.prisma.mission.update(
      {
  
          where : {
            id : idMission
          },
          data : {
  
            client : clientId
          }
      }
     )
  }

  deleteMission(missionId: string) {
   this.prisma.mission.delete({
    where: {
      id: missionId,
    },
  });
  }
  
  
}
