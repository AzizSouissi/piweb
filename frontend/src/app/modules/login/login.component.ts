import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../core/models/AuthentificationRequest';
import { AuthenticationResponse } from '../../core/models/AuthentificationResponse';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage!: string;
  authRequest: AuthenticationRequest = {};
  authResponse: AuthenticationResponse = {};
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService :UserService,
   
  ) {
  }

  authenticate() {
    console.log(this.authRequest);
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.authResponse = response;
          localStorage.setItem('token', response.access_token as string);
        this.userService.getUser(this.authRequest.email).subscribe(
            { next : (userData : any) =>{
              console.log(userData)
             
             localStorage.setItem('user',JSON.stringify(userData));
             /*if(userData.role="ADMIN")
             {
              this.router.navigate(['/users']);
             }else if (userData.role="ETUDIANT"){
              this.router.navigate(['/home']);
             }*/

             },error: (err: any) => {
               console.error(err);}
             }
           )
         
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Invalid email or password';
        }
      });
    
  }


}
