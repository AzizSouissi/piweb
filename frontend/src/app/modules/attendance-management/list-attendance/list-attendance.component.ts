import { Component } from '@angular/core';
import { AttendanceRecord } from '../../../core/models/attendanceRecord';
import { User } from '../../../core/models/user';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrl: './list-attendance.component.css',
})
export class ListAttendanceComponent {
  users: User[] = [];
  daysInMonth: any;
  $day: any;
  attendanceRecord: AttendanceRecord[] = [];

  constructor(private attendanceService: AttendanceTrackingService) {}

  ngOnInit(): void {
    this.attendanceService.findAllUsers().subscribe(
      (usersData) => {
        this.users = usersData;
        console.log(usersData);
      },
      (error) => {
        console.error('Error fetching users data:', error);
      }
    );
  }

  getAttendanceStatus(user: User, date: string): string {
    const record = user.attendanceRecord.find((item) => item.date === date);

    return record ? record.status : '';
  }
}
