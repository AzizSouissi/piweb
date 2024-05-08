import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  URL = "http://localhost:3000/missions"

  constructor(private _http: HttpClient) {
   }
   getAvailableUser()
   {
    return this._http.get(this.URL+"/availableUsers")
   }

   getUserIdByEmail(email : string)
   {
    return this._http.get(this.URL+`/email/${email}`)
   }
   
  
   addMission(mission: any) {
    return this._http.post(this.URL, mission);
  }
}
