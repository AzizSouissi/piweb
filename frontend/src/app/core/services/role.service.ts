import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "../models/Role";

@Injectable({
    providedIn: 'root'
  })
  export class RoleService {
    URL= "http://localhost:8080/roles"
    constructor(private _http: HttpClient){}

    getRoles() {
      return this._http.get<Role[]>(this.URL);
    }

    getRoleById(id : string): any
    {
       return this._http.get(this.URL+`/${id}`);
    }
    addRole(role: any)
    {
      return this._http.post(this.URL,role);
    }
    updateRole(role:any)
    {
      return this._http.put(this.URL,role);
    }

  }