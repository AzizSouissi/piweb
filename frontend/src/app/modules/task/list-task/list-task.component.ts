import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task-service';
import { Task } from '../../../core/models/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../core/models/User';
import { UserService } from '../../../core/services/user.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks: Task[] = [];
  users: User[] = []; // Array to store users
  email!: string;
  
  


  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const userProfileString = localStorage.getItem('user');
    if (userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      this.email = userProfile['email'] ;
    }
    // Fetch tasks
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks.filter(task => task.assignedToEmail === this.email);
    });
  }
  onDelete(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    }, (error) => {
      console.error('Error deleting task:', error);
      // Optionally, show a message to the user indicating that deletion failed
  });
}

  navigateToUpdate(id: string): void {
    console.log(id);
    this.router.navigate(['/home/tasks/UpdateTask/' + id]);
  }

  navigateToAdd(): void {
    this.router.navigate(['/home/tasks/AddTask']);
  }
}
