import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './FrontOffice/home/home.component';
import { AttendanceRecordManagementModule } from './attendance-record-management/attendance-record-management.module';


const routes: Routes = [

  { path: "home", component: HomeComponent },

  {
    path: "attendance", loadChildren: () =>
      import('./attendance-record-management/attendance-record-management.module').then(m => m.AttendanceRecordManagementModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
