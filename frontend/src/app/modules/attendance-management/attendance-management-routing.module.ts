import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateAttendanceComponent } from './update-attendance/update-attendance.component';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { ListAttendanceComponent } from './list-attendance/list-attendance.component';
import { CreateAttendanceComponent } from './create-attendance/create-attendance.component';

const routes: Routes = [
  { path: 'ListAttendance', component: ListAttendanceComponent },
  { path: 'addAttendance', component: AddAttendanceComponent },
  { path: 'updateAttendance', component: UpdateAttendanceComponent },
  { path: 'createAttendance', component: CreateAttendanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceManagementRoutingModule {}