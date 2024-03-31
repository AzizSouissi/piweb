import { Component, OnInit } from '@angular/core';
import {
  AttendanceRecord,
  ShiftType,
  Status,
} from '../../../core/models/attendanceRecord';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';
import { User } from '../../../core/models/user';

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
  user!: User;

  constructor(private attendanceService: AttendanceTrackingService) {}

  ngOnInit(): void {
    localStorage.setItem('user', this.id);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    this.dateStr = `${year}-${formattedMonth}-${formattedDay}`;
  }
  submitForm(): void {
    user: this.attendanceService
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
      userId: this.id,
    };
    console.log('zzzz', formData);
    this.attendanceService.create(this.id, formData).subscribe(
      (response) => {
        alert(response['message']);
      },
      (error) => {
        console.error('You have already :', error);
      }
    );
  }
}
