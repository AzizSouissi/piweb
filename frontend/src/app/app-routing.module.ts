import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'attendance',
    loadChildren: () =>
      import(
        './modules/attendance-management/attendance-management.module'
      ).then((m) => m.AttendanceManagementModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./modules/project-management/project-management.module').then(
        (m) => m.ProjectManagementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
