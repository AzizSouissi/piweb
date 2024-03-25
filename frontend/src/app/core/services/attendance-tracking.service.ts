import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { AttendanceRecord } from '../models/attendanceRecord';
import { Employee } from '../models/emloyee';
import { CreateAttendanceTrackingDto } from '../models/Dto/CreateAttendanceTrackingDto';

@Injectable({
  providedIn: 'root',
})
export class AttendanceTrackingService {
  private URL = 'http://localhost:3000/attendance-tracking';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  create(
    id: string,
    createAttendanceTrackingDto: CreateAttendanceTrackingDto
  ): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(
      `${this.URL}/${id}`,
      createAttendanceTrackingDto,
      this.httpOptions
    );
  }

  findAll(): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(this.URL, this.httpOptions);
  }

  findOne(id: string): Observable<AttendanceRecord | string> {
    return this.http.get<AttendanceRecord | string>(
      `${this.URL}/${id}`,
      this.httpOptions
    );
  }

  update(
    id: string,
    updateAttendanceTrackingDto: CreateAttendanceTrackingDto
  ): Observable<any> {
    return this.http.patch(
      `${this.URL}/${id}`,
      updateAttendanceTrackingDto,
      this.httpOptions
    );
  }

  remove(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.URL}/${id}`, this.httpOptions);
  }

  find(id: string): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.URL}/getEmploye/${id}`,
      this.httpOptions
    );
  }

  findAllEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${this.URL}/employers`, this.httpOptions)
      .pipe(
        tap((data: Employee[]) =>
          console.log('Response from findAllEmployees():', data)
        ),
        catchError((error) => {
          console.error('Error in findAllEmployees():', error);
          throw error;
        })
      );
  }
  findAllEmployeesWithAttendance(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.URL}/with-attendance`);
  }
  findEmployeesAttendance(month: number, year: number): Observable<Employee[]> {
    const url = `${this.URL}/${month}/${year}`;
    return this.http.get<Employee[]>(url);
  }
}
