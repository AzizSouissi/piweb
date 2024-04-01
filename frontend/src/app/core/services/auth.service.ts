import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthenticationRequest } from "../models/AuthentificationRequest";
import { AuthenticationResponse } from "../models/AuthentificationResponse";
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    URL = 'http://localhost:3000/auth/local/signin'
    LOGOUT_URL ='http://localhost:3000/auth/logout'
    
    constructor(private _http:HttpClient) { }

    login(
        authRequest: AuthenticationRequest
      ) {
        return this._http.post<AuthenticationResponse>
        (this.URL, authRequest);
      }

      _is_logged(): boolean {
        return !!localStorage.getItem('token');
    }

    logout()
    {
      return this._http.post<any>(this.LOGOUT_URL, {});
    }

  }