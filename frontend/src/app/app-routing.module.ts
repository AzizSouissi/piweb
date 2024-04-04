import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'holiday',
    loadChildren: () =>
      import(
        './modules/holiday-management/holiday-management.module'
      ).then((m) => m.HolidayManagementModule),
  },
  {
    path: 'task',
    loadChildren: () =>
      import(
        './modules/task/task.module'
      ).then((m) => m.TaskManagementModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
