import { Component, Input } from '@angular/core';
import { AttendanceRecord } from '../../../core/models/attendanceRecord';
import { User } from '../../../core/models/User';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrl: './list-attendance.component.css',
})
export class ListAttendanceComponent {
  user!: User; // Initialize as empty array
  daysInMonth: any;
  $day: any;
  attendanceRecord: AttendanceRecord[] = [];
  id!: string;

  constructor(private attendanceService: AttendanceTrackingService) {}

  ngOnInit(): void {
    let p = localStorage.getItem('user');
    console.log(p);
    if (p) {
      let email = JSON.parse(p)['email'];
      this.attendanceService.getUserIdByEmail(email).subscribe((data) => {
        this.id = data.id;
        this.attendanceService.find(this.id).subscribe((data) => {
          this.user = data;
          console.log('user', this.user);
        });
      });
    }
  }

  getAttendanceStatus(user: User, date: string): string {
    // Find the attendance record for the given date
    const record = user.attendanceRecord.find((item) => item.date === date);
    // Return the status if found, otherwise return an empty string
    return record ? record.status : '';
  }
}
