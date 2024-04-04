import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task-service';
import { Task } from '../../../core/models/task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe(data => {
      console.log(data);
      this.tasks = data;
    });
  }

  onDelete(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  navigateToUpdate(id: string): void {
    console.log(id);
    this.router.navigateByUrl('UpdateTask/' + id);
  }

  navigateToAdd(): void {
    this.router.navigateByUrl('AddTask');
  }
}
