import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  async getUserProfile() {
    const userString = await localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      const email = user['email'];

      this.userService.getUserByEmail(email).subscribe((userData: any) => {
        console.log(userData); // Make sure you see the user data in the console
        this.user = userData;
        console.log(this.user.firstname); // Access user data inside the subscribe callback
      });
    }
  }
}
