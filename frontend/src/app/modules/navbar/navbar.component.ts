import { NotificationsService } from './../../core/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '../../core/models/notification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    private datePipe: DatePipe
  ) {}
  user: string = '';
  data: Notification[] = [];
  id: string = '60957d882b8e761e9860e9a5';
  readStatus: boolean[] = [];
  ngOnInit(): void {
    // const userProfileString = localStorage.getItem('user');
    // if (userProf ileString) {
    //   const userProfile = JSON.parse(userProfileString);
    //   this.user = userProfile['firstname'] + ' ' + userProfile['lastname'];
    // }
    console.log(this.readStatus);
    this.notificationsService
      .getNotificationsByRecipientId(this.id)
      .subscribe((data) => {
        console.log(data);
        this.data = data.reverse();
        this.readStatus = data.map((element) => {
          return element.readAt != null;
        });
      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      };
    this.notificationsService
      .getNotificationsByRecipientId(this.id)
      .subscribe((data) => {});
  }
  isDropdownOpen = false;

  // Method to toggle the dropdown when clicking on the notification toggle button

  // Method to prevent click event propagation inside the dropdown
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.ngOnInit();
  }
  // logout() {
  //   this.authService.logout().subscribe(
  //     () => {
  //       localStorage.clear();
  //       this.router.navigate(['login']);
  //     },
  //     (error) => {
  //       console.error('Logout failed:', error);
  //     }
  //   );

  //   localStorage.clear();
  //   this.router.navigate(['login']);
  // }
  public changeStatus(id: string, index: number) {
    if (!this.readStatus[index]) {
      this.notificationsService.readNotification(id).subscribe((data) => {
        console.log(data);
        // Assuming that your API response indicates the notification is read successfully
      });
    } else {
      this.notificationsService.unreadNotification(id).subscribe((data) => {
        if (data) {
          console.log(data);
        }
      });
    }
    this.readStatus[index] = !this.readStatus[index];
  }
  deleteNotification(id: string) {
    this.notificationsService.cancelNotification(id).subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
  clearAll() {
    this.notificationsService.cancelAllNotifications().subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
  getTimeDifference(readAt: Date | null): string | null {
    const systemDate = new Date();
    if (readAt) {
      const readDate = new Date(readAt);
      const timeDifference = systemDate.getTime() - readDate.getTime(); // Difference in milliseconds

      // Calculate time difference in minutes
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));

      // Format and return the time difference using DatePipe
      /* return minutesDifference <= 59
        ? (this.datePipe.transform(
            new Date(0, 0, 0, 0, minutesDifference),
            'mm'
          ) + ' minutes ago')
        : this.datePipe.transform(
            new Date(0, 0, 0, 0, minutesDifference),
            'HH '
          ) + ' hours ago';
          */
      const transformedDate = this.datePipe.transform(
        new Date(0, 0, 0, 0, minutesDifference),
        minutesDifference <= 59 ? 'mm' : 'HH'
      );

      const formattedDate = transformedDate!.startsWith('0')
        ? transformedDate!.substring(1)
        : transformedDate;

      return minutesDifference <= 59
        ? formattedDate + ' minutes ago'
        : formattedDate + ' hours ago';
    } else {
      return null;
    }
  }
  markAllAsRead() {
    this.notificationsService.readAllNotifications().subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
  deleteAll() {
    this.notificationsService.cancelAllNotifications().subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
}
