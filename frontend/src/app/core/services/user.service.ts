import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) {}

  getUser(email: any) {
    return this._http.get<any>(this.URL + '/UserPrivilegesByEmail/' + email);
  }

  getAllUsers(): any {
    return this._http.get(this.URL);
  }

  addUser(user: any) {
    return this._http.post(this.URL, user);
  }

  deleteUser(id: string) {
    return this._http.delete(this.URL + `/${id}`);
  }

  getUserByEmail(email: string) {
    return this._http.get(this.URL + `/email/${email}`);
  }
  getUserById(id: string) {
    return this._http.get(this.URL + `/${id}`);
  }

  updateUser(id: string, user: any) {
    return this._http.patch(this.URL + `/${id}`, user);
  }
}
