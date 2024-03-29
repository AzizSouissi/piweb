import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { AttendanceRecord, ShiftType } from '../models/attendanceRecord';
import { Employee } from '../models/emloyee';
import {
  CreateAttendanceTrackingDto,
  Status,
} from '../models/Dto/CreateAttendanceTrackingDto';

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
    return this.http.put(
      `${this.URL}/updateAttendance/${id}`,
      updateAttendanceTrackingDto,
      this.httpOptions
    );
  }
  updateEmployeeAndAttendance(
    employeeId: string,
    updateEmployeeDto: Employee
  ): Observable<Employee> {
    const url = `${this.URL}/updateEmployee/${employeeId}`;
    return this.http.put<Employee>(url, updateEmployeeDto);
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
  updateAttendanceRecord(
    id: string,
    updateDto: CreateAttendanceTrackingDto
  ): Observable<AttendanceRecord> {
    const url = `${this.URL}/${id}`;
    return this.http.put<AttendanceRecord>(url, updateDto, this.httpOptions);
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
  getAttendanceByEmployeeIdAndDate(
    id: string,
    date: string
  ): Observable<AttendanceRecord | null> {
    const url = `${this.URL}/${id}?date=${date}`;
    return this.http.get<AttendanceRecord | null>(url);
  }
}
