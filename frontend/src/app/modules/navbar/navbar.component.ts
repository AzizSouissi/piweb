import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const userProfileString = localStorage.getItem('user');
    if (userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      this.user = userProfile['firstname'] + ' ' + userProfile['lastname'];
    }
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.clear();
        this.router.navigate(['login']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );

    localStorage.clear();
    this.router.navigate(['login']);
  }
}
