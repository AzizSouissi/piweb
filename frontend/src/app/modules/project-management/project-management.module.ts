import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectCardComponent } from './projectCard/projectCard.component';
import { ListProjectsComponent } from './ListProjects/ListProjects.component';

@NgModule({
  declarations: [ProjectCardComponent, ListProjectsComponent],
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
