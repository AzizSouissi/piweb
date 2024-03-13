import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, subDays } from 'date-fns';
interface MyEvent extends CalendarEvent {
  title: string;
  start: Date;
  end?: Date; // Optional end date
}

@Component({
  selector: 'app-add-attendance-record',
  templateUrl: './add-attendance-record.component.html',
  styleUrl: './add-attendance-record.component.css',
})
export class AddAttendanceRecordComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  calendarEvents: MyEvent[] = [];
  viewDate: Date = new Date();

  ngOnInit(): void {
    this.calendarEvents = [
      {
        title: 'Event 1',
        start: addDays(this.viewDate, 10),
      },
      {
        title: 'All Day Event',
        start: addDays(this.viewDate, 15),
        end: addDays(this.viewDate, 17),
      },
    ];
  }

  onEventClick($event: CalendarEvent): void {
    // Handle event click logic here (optional)
    console.log('Event clicked:', $event);
  }

  onViewDateChange(date: Date): void {
    this.viewDate = date;
  }

  onNavigate(date: Date, view: CalendarView): void {
    this.viewDate = date;
    this.view = view;
  }
}
