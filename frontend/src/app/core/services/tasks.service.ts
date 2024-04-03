import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../models/emloyee';
import {CreateTaskDto, TaskStatus, TaskPriority} from '../models/Dto/CreateTaskDto';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private URL = 'http://localhost:3000/Task';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}
  createTask(taskData: CreateTaskDto): Observable<any> {
    return this.http.post<any>(this.URL, taskData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get a task by its ID
  getTask(taskId: string): Observable<any> {
    const url = `${this.URL}/${taskId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Get all tasks 
  findAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.URL, this.httpOptions);
  }

  // Update an existing task
  updateTask(taskId: string, taskData: CreateTaskDto): Observable<any> {
    const url = `${this.URL}/${taskId}`;
    return this.http.put<any>(url, taskData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a task by its ID
  deleteTask(taskId: string): Observable<any> {
    const url = `${this.URL}/${taskId}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}