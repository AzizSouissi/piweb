import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
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
  styleUrls: ['./add-attendance.component.css'],
})
export class AddAttendanceComponent implements OnInit {
  monthData: MonthData[] = [];
  users: User[] = [];
  user!: User;
  daysInMonth: number[] = [];
  currentMonthYear: string = '';
  selectedDate: Date = new Date();
  absenceReason: string = '';
  attendanceRecordId!: string;
  selectedDuration!: ShiftType;
  userid!: string;
  day!: number;
  isModalOpened: boolean = false; // Flag to track if the modal is open

  constructor(private attendanceService: AttendanceTrackingService) {}

  ngOnInit(): void {
    this.generateMonthData(new Date());
    this.attendanceService.findAllUsers().subscribe({
      next: (data: User[]) => {
        console.log(data);
        this.users = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  openModal(user: User, day: number) {
    console.log(user, day);
    this.user = user;
    this.day = day;
    this.isModalOpened = true;
  }

  handleUpdate() {
    console.log('User:', this.user);
    console.log('Day:', this.day);
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const formattedDay = this.day < 10 ? `0${this.day}` : this.day; // Ensure day has leading zero if needed
    const dateStr = `${year}-${month < 10 ? '0' : ''}${month}-${formattedDay}`; // Construct date string

    this.attendanceService
      .getAttendanceByUserIdAndDate(this.user.id, dateStr)
      .subscribe(
        (attendanceRecord: AttendanceRecord | null) => {
          console.log(this.user.id);
          console.log(dateStr); // Log the constructed date string
          if (attendanceRecord) {
            console.log(attendanceRecord.id);

            // Check if status is "present"

            // Ensure selectedDuration is one of the enum values

            console.log('kkk', this.selectedDuration);

            const updateDto: CreateAttendanceTrackingDto = {
              date: dateStr,
              absent_reason: null,
              shiftType: this.selectedDuration,
              status: Status.PRESENT,
              userId: this.user.id, // Assign the employee's ID
              // Optionally, you can also assign the employee object
            };

            this.attendanceService
              .update(attendanceRecord.id, updateDto)
              .subscribe(
                (response) => {
                  console.log(this.user, 'succesfully');
                  // Optionally, perform any other actions upon successful update
                },
                (error) => {
                  console.error('Error updating attendance record:', error);
                }
              );
          }
        },
        (error) => {
          console.error('Error fetching attendance record:', error);
        }
      );
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
      users: this.users,
    };

    this.monthData.push(monthData);
  }

  switchMonth(delta: number) {
    this.monthData = [];
    this.selectedDate.setMonth(this.selectedDate.getMonth() + delta);
    this.generateMonthData(this.selectedDate);
  }

  updateAttendanceRecord(): void {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const formattedDay = this.day < 10 ? `0${this.day}` : this.day; // Ensure day has leading zero if needed
    const dateStr = `${year}-${month < 10 ? '0' : ''}${month}-${formattedDay}`; // Construct date string

    this.attendanceService
      .getAttendanceByUserIdAndDate(this.user.id, dateStr)
      .subscribe(
        (attendanceRecord: AttendanceRecord | null) => {
          console.log(this.user.id);
          console.log(dateStr);
          if (attendanceRecord) {
            const updateDto: CreateAttendanceTrackingDto = {
              date: this.selectedDate.toISOString().slice(0, 10),
              shiftType: null,
              status: Status.ABSENT,
              absent_reason: this.absenceReason,
              userId: this.user.id,
            };

            this.attendanceService
              .update(attendanceRecord.id, updateDto)
              .subscribe(
                (response) => {
                  console.log(
                    'Attendance record updated successfully:',
                    response
                  );
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
}

interface MonthData {
  monthName: string;
  monthIndex: number;
  days: number[];
  users: User[];
}
