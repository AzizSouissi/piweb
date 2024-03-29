import { Component, OnInit } from '@angular/core';
import {
  AttendanceRecord,
  ShiftType,
  Status,
} from '../../../core/models/attendanceRecord';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';
import { Employee } from '../../../core/models/emloyee';

@Component({
  selector: 'app-create-attendance',
  templateUrl: './create-attendance.component.html',
  styleUrl: './create-attendance.component.css',
})
export class CreateAttendanceComponent implements OnInit {
  currentDate!: Date;
  selectedStatus!: Status.PRESENT | Status.ABSENT; // Default to 'present'
  selectedShiftType!: ShiftType;
  absentReason!: string;
  id: string = '65f3d38056ca42723ee7fe4b';
  dateStr!: string;
  employee!: Employee;

  constructor(private attendanceService: AttendanceTrackingService) {}

  ngOnInit(): void {
    localStorage.setItem('employee', this.id);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    this.dateStr = `${year}-${formattedMonth}-${formattedDay}`;
  }
  submitForm(): void {
    employee: this.attendanceService
      .find(this.id)
      .subscribe((data) => console.log(data));
    const selectedDuration: ShiftType = this.selectedShiftType as ShiftType;

    Object.values(ShiftType).includes(selectedDuration);

    const formData: AttendanceRecord = {
      status: this.selectedStatus,
      shiftType: selectedDuration,
      absent_reason: this.absentReason,
      id: '',
      date: this.dateStr,
      employeeId: this.id,
    };
    console.log('zzzz', formData);
    this.attendanceService.create(this.id, formData).subscribe(
      (response) => {
        console.log('Attendance submitted successfully!', response);
      },
      (error) => {
        console.error('Error submitting attendance:', error);
      }
    );
  }
}
