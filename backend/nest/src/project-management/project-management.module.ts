import { Module } from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';
import { ProjectManagementController } from './project-management.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectManagementController],
  providers: [ProjectManagementService, PrismaService],
})
export class ProjectManagementModule {}
