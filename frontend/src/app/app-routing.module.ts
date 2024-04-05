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
    path: 'department',
    loadChildren: () =>
      import(
        './modules/department-management/department-management.module'
      ).then((m) => m.DepartmentManagementModule),
  },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
