/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersService } from './../users/users.service';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mission, MissionStatus } from './schemas/Mission.Shema';
import { Model } from 'mongoose';
import { TasksService } from 'src/tasks/tasks.service';
import { CronJob } from 'cron';
import { User } from '@prisma/client';

@Injectable()
export class MissionsService {
  constructor(
    @InjectModel(Mission.name) private missionModel: Model<Mission>,
    private TasksService: TasksService,
    private UsersService: UsersService,
  ) {
    this.startCronJobForMissions();
    this.startCronJobForEmployees();
  }

  async createMission(createMissionDto: CreateMissionDto): Promise<Mission> {
    const createdMission = new this.missionModel(createMissionDto);
    return createdMission.save();
  }

  async assignUserToMission(createMissionDto: Mission): Promise<Mission> {
    const {title ,description ,startDate ,endDate ,status, assignedTo, lieu, client } = createMissionDto;
    return this.missionModel.create({
      data: {
        title,
        description,
        startDate, 
        endDate,
        status,
        assignedTo,
        lieu,
        client,
      },
    });
  }

  async updateMission(
    missionId: string,
    updateMissionDto: UpdateMissionDto,
  ): Promise<Mission> {
    const existingMission = await this.missionModel.findById(missionId);

    if (!existingMission) {
      throw new HttpException('Mission non trouvée', 404);
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
  async findById(missionId: string): Promise<Mission> {
    const mission = await this.missionModel.findById(missionId);
    if (!mission) {
      throw new HttpException('Mission non trouvée', 404);
    }
    return mission;
  }
  async deleteMission(missionId: string): Promise<void> {
    const existingMission = await this.findById(missionId);
    if (existingMission) {
      await this.missionModel.findByIdAndDelete(missionId);
    } else {
      throw new HttpException('Mission non trouvée', 404);
    }
  }
  async deleteMultipleMissions(ids: string[]): Promise<void> {
    try {
      console.log(ids);
      const result = await this.missionModel
        .deleteMany({ _id: { $in: ids } })
        .exec();
    } catch (error) {
      throw new Error(`Impossible de supprimer les missions : ${error}`);
    }
  }

  async findAll(pageNumber: number, pageSize: number): Promise<Mission[]> {
    const skip = (pageNumber - 1) * pageSize;
    return this.missionModel.find().skip(skip).limit(pageSize).exec();
  }
  async assignClientToMission(
    missionId: string,
    clientId: string,
  ): Promise<Mission> {
    const mission = await this.missionModel.findById(missionId);
    const client = await this.UsersService.getUserById(clientId);

    if (!mission || !client) {
      throw new HttpException('Mission ou client non trouvé', 404);
    }

    mission.client = client;

    return mission.save();
  }
  startCronJobForMissions() {
    const job = new CronJob('* * * * *', async () => {
      await this.checkAndUpdateMissions();
    });

    job.start();
  }
  async checkAndUpdateMissions() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const missions = await this.missionModel.find().exec();

    for (const mission of missions) {
      if (mission.status === 'ongoing' && new Date(mission.endDate) <= today) {
        mission.status = MissionStatus.Completed;
        await mission.save();
      } else if (
        mission.status === 'pending' &&
        mission.assignedTo.length === 0 &&
        new Date(mission.startDate) <= today
      ) {
        mission.status = MissionStatus.Canceled;
        await mission.save();
      } else if (
        mission.status === 'pending' &&
        new Date(mission.startDate) <= today &&
        mission.assignedTo.length !== 0 &&
        new Date(mission.startDate)
      ) {
        mission.status = MissionStatus.Ongoing;
        await mission.save();
      }
    }
  }

  async createAndAssignMission(
    createMissionDto: CreateMissionDto,
    token: string,
  ): Promise<Mission> {
    const clientId = await this.UsersService.getIdfromToken(token);

    const client = await this.UsersService.getUserById(clientId);

    if (!client) {
      throw new HttpException('Client non trouvé', 404);
    }

    const createdMission = new this.missionModel(createMissionDto);
    createdMission.client = client;

    return createdMission.save();
  }
  async getMissionByEmployeeId(token: string): Promise<Mission> {
    const employeeId = await this.UsersService.getIdfromToken(token);
    console.log(employeeId);

    const mission = await this.missionModel
      .findOne({ assignedTo: employeeId })
      .exec();

    if (!mission) {
      throw new NotFoundException('Mission non trouvée pour cet employé');
    }

    return mission;
  }
  async getUsersAvailable(date: string): Promise<User[]> {
    const users = await this.UsersService.getUsers();
    const availableUsers: User[] = [];

    for (const user of users) {
      const isAvailable = await this.TasksService.findAll == null;
      if (isAvailable) {
        availableUsers.push(user);
      }
    }

    return availableUsers;
  }

  async isUserAvailableForMission(
    employeeId: string,
    date: string,
  ): Promise<boolean> {
    const missions = await this.missionModel
      .find({ assignedTo: employeeId })
      .exec();
    console.log('assignedto', missions);
    let missionCount = 0;
    for (const mission of missions) {
      const startDate = new Date(mission.startDate);
      const endDate = new Date(mission.endDate);
      const checkDate = new Date(date);
      console.log('date', checkDate);
      console.log('startdate', startDate.getTime());
      console.log('checkdate', checkDate.getTime());
      console.log('enddate', endDate.getTime());

      if (
        startDate.getTime() <= checkDate.getTime() &&
        endDate.getTime() >= checkDate.getTime()
      ) {
        missionCount++;
      }
    }
    return missionCount === 0;
  }

  startCronJobForEmployees() {
    const job = new CronJob('0 0 * * *', async () => {
      await this.unassignEmployeesFromCancelledOrCompletedMissions();
    });

    job.start();
  }

  async unassignEmployeesFromCancelledOrCompletedMissions() {
    const missions = await this.missionModel
      .find({
        status: { $in: [MissionStatus.Canceled, MissionStatus.Completed] },
      })
      .exec();

    for (const mission of missions) {
      mission.assignedTo = [];
      await mission.save();
    }
  }

  async getmissionsbyclient(token: string): Promise<Mission[]> {
    const id_client = await this.UsersService.getIdfromToken(token);
    console.log(id_client);
    const missions = await this.missionModel.find({ client: id_client }).exec();

    if (!missions || missions.length === 0) {
      throw new NotFoundException(
        'Aucune mission trouvée pour cet client employé',
      );
    }

    return missions;
  }
}
