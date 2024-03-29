import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceManagementRoutingModule } from './attendance-management-routing.module';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { UpdateAttendanceComponent } from './update-attendance/update-attendance.component';
import { ListAttendanceComponent } from './list-attendance/list-attendance.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AddAttendanceComponent,
    UpdateAttendanceComponent,
    ListAttendanceComponent,
  ],
  imports: [
    CommonModule,
    AttendanceManagementRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AttendanceManagementModule {}
