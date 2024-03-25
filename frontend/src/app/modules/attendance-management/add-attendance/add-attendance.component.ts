import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../core/models/emloyee';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrl: './add-attendance.component.css',
})
export class AddAttendanceComponent implements OnInit {
  employees: Employee[] = [];
  employee!: Employee;
  daysInMonth: number[] = [];
  currentMonthYear: string = '';
  ngOnInit(): void {
    this.generateDaysInMonth(new Date());
    this.attendanceService.findAllEmployees().subscribe({
      next: (data: Employee[]) => {
        console.log(data);
        this.employees = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
  constructor(private attendanceService: AttendanceTrackingService) {}

  generateDaysInMonth(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const days = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);

    // Formatting the month and year for the title
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.currentMonthYear = `${monthNames[month]} ${year}`;
  }
  showShiftOptions(event: any, employeeId: string, day: number): void {
    if (event.target.checked) {
      const modalId = `${employeeId}-${day}-modal`;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    } else {
      // Hide the modal if present checkbox is unchecked
      const modalId = `${employeeId}-${day}-modal`;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    }
  }
}
