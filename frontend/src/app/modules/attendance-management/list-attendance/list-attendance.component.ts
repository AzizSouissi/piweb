import { Component } from '@angular/core';
import { AttendanceRecord } from '../../../core/models/attendanceRecord';
import { Employee } from '../../../core/models/emloyee';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrl: './list-attendance.component.css',
})
export class ListAttendanceComponent {
  employees: Employee[] = []; // Initialize as empty array
  daysInMonth: any;
  $day: any;
  attendanceRecord: AttendanceRecord[] = [];

  constructor(private attendanceService: AttendanceTrackingService) {}

  ngOnInit(): void {
    // Call the service method to fetch all employees' attendance data
    this.attendanceService.findAllEmployees().subscribe(
      (employeesData) => {
        this.employees = employeesData;
        console.log(employeesData);
      },
      (error) => {
        console.error('Error fetching employees data:', error);
      }
    );
  }

  getAttendanceStatus(employee: Employee, date: string): string {
    // Find the attendance record for the given date
    const record = employee.attendanceRecord.find((item) => item.date === date);
    // Return the status if found, otherwise return an empty string
    return record ? record.status : '';
  }
}
