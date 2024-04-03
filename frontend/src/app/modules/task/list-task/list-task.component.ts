import { Component, OnInit } from '@angular/core';
import { Task } from '../../../core/models/Task';
import { TaskService } from '../../../core/services/tasks.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTaskComponent implements OnInit {
  tasks: Task[] = []; // Initialize as empty array

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Call the service method to fetch all tasks
    this.taskService.findAllTasks().subscribe(
      (tasksData) => {
        this.tasks = tasksData;
        console.log(tasksData);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
}
