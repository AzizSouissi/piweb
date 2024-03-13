import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAttendanceRecordComponent } from './add-attendance-record/add-attendance-record.component';
import { UpdateAttendanceRecordComponent } from './update-attendance-record/update-attendance-record.component';
import {ListAttendanceRecordComponent} from './list-attendance-record/list-attendance-record.component'
const routes: Routes = [
  { path: 'ListAttendance', component: ListAttendanceRecordComponent },
  { path: 'addAttendance', component: AddAttendanceRecordComponent },
  { path: 'updateAttendance', component: UpdateAttendanceRecordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRecordManagementRoutingModule {}
