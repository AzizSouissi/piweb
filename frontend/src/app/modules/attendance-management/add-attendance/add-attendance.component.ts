import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../core/models/emloyee';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';
import { ShiftType } from '../../../core/models/attendanceRecord';
import {
  CreateAttendanceTrackingDto,
  Status,
} from '../../../core/models/Dto/CreateAttendanceTrackingDto';
import { AttendanceRecord } from '../../../core/models/attendanceRecord';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrl: './add-attendance.component.css',
})
export class AddAttendanceComponent implements OnInit {
  monthData: MonthData[] = [];
  employees: Employee[] = [];
  employee!: Employee;
  daysInMonth: number[] = [];
  currentMonthYear: string = '';
  selectedDate: Date = new Date();
  absenceReason: string = '';
  attendanceRecordId!: string;
  selectedDuration: any;

  constructor(private attendanceService: AttendanceTrackingService) {}
  ngOnInit(): void {
    this.generateMonthData(new Date());
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

  isWeekend(day: number): boolean {
    const date = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      day
    );
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
  }

  generateMonthData(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const days = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);

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

    const monthData: MonthData = {
      monthName: this.currentMonthYear,
      monthIndex: month,
      days: this.daysInMonth,
      employees: this.employees,
    };

    this.monthData.push(monthData);
  }

  switchMonth(delta: number) {
    this.monthData = [];
    this.selectedDate.setMonth(this.selectedDate.getMonth() + delta);
    this.generateMonthData(this.selectedDate);
  }
  updateAttendance(employee: Employee, day: number, absenceReason: string) {
    console.log('Clicked day:', day);
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const formattedDay = day < 10 ? `0${day}` : day; // Ensure day has leading zero if needed
    const dateStr = `${year}-${month < 10 ? '0' : ''}${month}-${formattedDay}`; // Construct date string

    this.attendanceService
      .getAttendanceByEmployeeIdAndDate(employee.id, dateStr)
      .subscribe(
        (attendanceRecord: AttendanceRecord | null) => {
          console.log(employee.id);

          console.log(dateStr); // Log the constructed date string
          if (attendanceRecord) {
            console.log(attendanceRecord.id);
            const updateDto: CreateAttendanceTrackingDto = {
              date: dateStr,
              shiftType: null,
              status: Status.ABSENT,
              absent_reason: this.absenceReason,
              employeeId: employee.id, // Assign the employee's ID
              // Optionally, you can also assign the employee object
            };

            this.attendanceService
              .update(attendanceRecord.id, updateDto)
              .subscribe(
                (response) => {
                  alert('Updated Succesfully !!');
                  // Optionally, perform any other actions upon successful update
                },
                (error) => {
                  console.error('Error updating attendance record:', error);
                }
              );
          } else {
            console.error(
              'Attendance record not found for the selected day and employee.'
            );
          }
        },
        (error) => {
          console.error('Error fetching attendance record:', error);
        }
      );
  }
  openUpdateModal(
    employee: Employee,
    day: number,
    absenceReason: string
  ): void {
    this.employee = employee; // Assuming you have a property named employeeId in your component
    // Assuming you have a property named selectedDay in your component
    this.absenceReason = absenceReason; // Assuming you have a property named absenceReason in your component
  }
  handleUpdate(employee: Employee, day: number) {
    console.log('Clicked day:', day);
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const formattedDay = day < 10 ? `0${day}` : day; // Ensure day has leading zero if needed
    const dateStr = `${year}-${month < 10 ? '0' : ''}${month}-${formattedDay}`; // Construct date string

    this.attendanceService
      .getAttendanceByEmployeeIdAndDate(employee.id, dateStr)
      .subscribe(
        (attendanceRecord: AttendanceRecord | null) => {
          console.log(employee.id);

          console.log(dateStr); // Log the constructed date string
          if (attendanceRecord) {
            console.log(attendanceRecord.id);

            // Check if status is "present"
            if (attendanceRecord.status === Status.PRESENT) {
              // Ensure selectedDuration is one of the enum values
              const selectedDuration: ShiftType = this
                .selectedDuration as ShiftType;
              if (Object.values(ShiftType).includes(selectedDuration)) {
                // Update shift type
                const updateDto: CreateAttendanceTrackingDto = {
                  date: dateStr,
                  shiftType: selectedDuration,
                  status: Status.PRESENT,
                  employeeId: employee.id, // Assign the employee's ID
                  // Optionally, you can also assign the employee object
                };

                this.attendanceService
                  .update(attendanceRecord.id, updateDto)
                  .subscribe(
                    (response) => {
                      alert('Updated Successfully !!');
                      // Optionally, perform any other actions upon successful update
                    },
                    (error) => {
                      console.error('Error updating attendance record:', error);
                    }
                  );
              } else {
                console.log('Invalid shift type.');
              }
            } else {
              console.log('Employee is not present, no update needed.');
            }
          } else {
            console.error(
              'Attendance record not found for the selected day and employee.'
            );
          }
        },
        (error) => {
          console.error('Error fetching attendance record:', error);
        }
      );
  }
}

interface MonthData {
  monthName: string;
  monthIndex: number;
  days: number[];
  employees: Employee[];
}
