import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    URL = "http://localhost:8080/users" 
    URL2="http://localhost:8080/authenticate/register"

    constructor(private _http: HttpClient) { }

    getUser(email: any)
    {
    return this._http.get<any>(this.URL+"/email/"+email)
    }

  getAllUsers():any
  {
    return this._http.get(this.URL);
  }


  addUser(user:any)
  {
    return this._http.post(this.URL2,user);
  }
  }