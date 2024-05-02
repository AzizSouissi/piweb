import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Allowance } from '../models/allowance';

@Injectable({
  providedIn: 'root',
})
export class AllowanceService {
  URL = 'http://localhost:3000/allowances';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createAllowance(allowance: Allowance) {
    return this.http.post<Allowance>(this.URL, allowance, this.httpOptions);
  }

  getAllAllowances() {
    return this.http.get<Allowance[]>(this.URL, this.httpOptions);
  }

  getAllowancesByMonth(month: string) {
    return this.http.get<Allowance[]>(
      `${this.URL}/month/${month}`,
      this.httpOptions
    );
  }

  getAllowancesByUserId(userId: string) {
    return this.http.get<Allowance[]>(
      `${this.URL}/user/${userId}`,
      this.httpOptions
    );
  }
}
