import { $Enums, Project, User } from '@prisma/client';

export class CreateProjectManagementDto {
  id: string;
  users: User[];
  usersIds: String[];
  leader: string;
  startDate: string;
  endDate: string;
  projectStatus: $Enums.ProjectStatus;
}
