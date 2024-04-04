import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../../core/models/Task';
import { TaskService } from '../../../core/services/task-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})

export class AddTaskComponent {
constructor(private taskService:TaskService, private router:Router){ }
add(form: NgForm){
  if(form.valid){
    const task: Task ={
      taskId: '',
      title: form.value.title,
      description: form.value.description,
      priority: form.value.priority,
      status: form.value.status,
      createBy: form.value.createBy,
      createdAt: form.value.createdAt,
      updatedAt: form.value
    }
    this.taskService.addTask(task).subscribe(
      () => {
        alert('Added Successfully!');
        this.router.navigate(['tasks/']);
      },
      error => {
        console.error(error);

      }
    );
  }
}
}
