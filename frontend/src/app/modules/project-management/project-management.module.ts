import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ListProjectsComponent } from './ListProjects/ListProjects.component';
import { ProjectCardComponent } from './projectCard/projectCard.component';

@NgModule({
  declarations: [ListProjectsComponent, ProjectCardComponent],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatCardModule,
  ],
})
export class ProjectManagementModule {}
