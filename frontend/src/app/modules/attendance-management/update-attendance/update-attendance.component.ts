import { Component, OnInit } from '@angular/core';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';
import { User } from '../../../core/models/user';
import {
  AttendanceRecord,
  ShiftType,
} from '../../../core/models/attendanceRecord';

@Component({
  selector: 'app-update-attendance',
  templateUrl: './update-attendance.component.html',
  styleUrls: ['./update-attendance.component.css'],
})
export class UpdateAttendanceComponent implements OnInit {
  monthData: MonthData[] = [];
  users: User[] = [];
  daysInMonth: number[] = [];
  currentMonthYear: string = '';
  selectedDate: Date = new Date();

  constructor(private attendanceService: AttendanceTrackingService) {}

  ngOnInit() {
    this.generateMonthData(this.selectedDate);
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

  getStatusForDay(user: User, day: number, monthIndex: number): string {
    const attendanceRecordsForMonth = user.attendanceRecord.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() === monthIndex && recordDate.getDate() === day
      );
    });

    const attendanceRecordForDay =
      attendanceRecordsForMonth.length > 0
        ? attendanceRecordsForMonth[0].status
        : '';
    return attendanceRecordForDay;
  }
  isWeekend(day: number): boolean {
    const date = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      day
    );
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }
  getShiftTypeForDay(user: User, day: number, monthIndex: number): '' | any {
    const attendanceRecordsForMonth = user.attendanceRecord.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() === monthIndex && recordDate.getDate() === day
      );
    });

    const attendanceRecordForDay =
      attendanceRecordsForMonth.length > 0
        ? attendanceRecordsForMonth[0].shiftType
        : '';

    return attendanceRecordForDay !== '' ? attendanceRecordForDay : null;
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
}

interface MonthData {
  monthName: string;
  monthIndex: number;
  days: number[];
  users: User[];
}
