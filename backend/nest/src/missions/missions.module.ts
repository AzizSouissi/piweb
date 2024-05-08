import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { PrismaService } from 'src/prisma.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mission, MissionSchema } from './schemas/Mission.Shema';
import { entreprise, EntrepriseSchema } from './schemas/Entreprise.Schema';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mission.name, schema: MissionSchema },
      { name: entreprise.name, schema: EntrepriseSchema },
    ]),
  ],
  controllers: [MissionsController],
  providers: [MissionsService, PrismaService, TasksService, UsersService],
})
export class MissionsModule {}
