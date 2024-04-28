import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AttendanceRecord } from '../../../core/models/attendanceRecord';
import { User } from '../../../core/models/User';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.css'],
})
export class ListAttendanceComponent implements OnInit, OnDestroy {
  user!: User;
  daysInMonth: any;
  $day: any;
  attendanceRecord: AttendanceRecord[] = [];
  id!: string;
  private refreshSubscription: Subscription;

  constructor(private attendanceService: AttendanceTrackingService) {
    this.refreshSubscription = this.attendanceService.refreshNeeded.subscribe(
      () => {
        this.loadAttendanceRecords();
      }
    );
  }

  ngOnInit(): void {
    let p = localStorage.getItem('user');
    console.log(p);
    if (p) {
      let email = JSON.parse(p)['email'];
      this.attendanceService.getUserIdByEmail(email).subscribe((data) => {
        this.id = data.id;
        this.loadAttendanceRecords();
      });
    }
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  loadAttendanceRecords(): void {
    this.attendanceService.find(this.id).subscribe((data) => {
      this.user = data;
      console.log('user', this.user);
    });
  }

  getAttendanceStatus(user: User, date: string): string {
    const record = user.attendanceRecord.find((item) => item.date === date);
    return record ? record.status : '';
  }
}
