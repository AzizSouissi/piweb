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
  users: User[] = []; // Initialize as empty array
  daysInMonth: any;
  $day: any;
  attendanceRecord: AttendanceRecord[] = [];

  constructor(private attendanceService: AttendanceTrackingService) {}

  ngOnInit(): void {
    // Call the service method to fetch all users' attendance data
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
    // Find the attendance record for the given date
    const record = user.attendanceRecord.find((item) => item.date === date);
    // Return the status if found, otherwise return an empty string
    return record ? record.status : '';
  }
}
