import { Component, OnInit } from '@angular/core';
import { AttendanceTrackingService } from '../../core/services/attendance-tracking.service';
import { Employee } from '../../core/models/emloyee'; // Update the path accordingly
import { AttendanceRecord } from '../../core/models/attendanceRecord';

@Component({
  selector: 'app-attendance',
  templateUrl: './list-attendance-record.component.html',
  styleUrls: ['./list-attendance-record.component.css'],
})
export class ListAttendanceRecordComponent implements OnInit {
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
