import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './ListProjects/ListProjects.component';
import { AuthGuard } from '../../core/guards/auth-guard.guard';
import { ProjectGuard } from '../../core/guards/project-guard.guard';
import { AddProjectComponent } from './addProject/addProject.component';

const routes: Routes = [
  {
    path: '',
    component: ListProjectsComponent,
    canActivate: [AuthGuard, ProjectGuard],
  },
  { path: 'addProject', component: AddProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule {}
