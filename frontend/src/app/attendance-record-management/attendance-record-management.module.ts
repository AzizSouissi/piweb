import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAttendanceRecordComponent } from './add-attendance-record/add-attendance-record.component';
import { AttendanceRecordManagementRoutingModule } from './attendance-record-management-routing.module';
import { ListAttendanceRecordComponent } from './list-attendance-record/list-attendance-record.component';
import { UpdateAttendanceRecordComponent } from './update-attendance-record/update-attendance-record.component';
import { AttendanceTrackingService } from '../core/services/attendance-tracking.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';

@NgModule({
  declarations: [
    ListAttendanceRecordComponent,
    AddAttendanceRecordComponent,
    UpdateAttendanceRecordComponent,
  ],
  imports: [
    CommonModule,
    AttendanceRecordManagementRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
  ],
  providers: [AttendanceTrackingService],
})
export class AttendanceRecordManagementModule {}
