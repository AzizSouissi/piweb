import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../core/models/AuthentificationRequest';
import { AuthenticationResponse } from '../../core/models/AuthentificationResponse';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { EncryptionService } from '../../core/services/encryption.service';

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
    private encryptionService :EncryptionService,
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
              
              const user = {
                firstname : userData.firstname,
                lastname : userData.lastname,
                email : userData.email
              }
               
             const authorities =this.encryptionService.encrypt(JSON.stringify(userData.authorities),"2f7")
             localStorage.setItem('authorities',authorities)
             localStorage.setItem('user',JSON.stringify(user));
             this.router.navigate(['/home']);

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