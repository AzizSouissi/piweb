import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit {
   user : string = ""

   constructor(private router: Router){}
   
   ngOnInit(): void {
    const userProfileString = localStorage.getItem("user");
    if (userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      this.user = userProfile["firstname"] + " " + userProfile["lastname"];
    }
  }

  logout()
  {
    localStorage.clear() 
    this.router.navigate(["login"])
  }


}
