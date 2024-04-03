import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../core/models/Task';
import { TaskService } from '../../../core/services/tasks.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskId!: string | null;
  task!: Task;
  taskForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedTo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.taskId = id;
      this.loadTaskDetails();
    } else {
      console.error('Task ID is null.');
    }
  }

  loadTaskDetails(): void {
    if (this.taskId !== null) {
      this.taskService.getTask(this.taskId).subscribe({
        next: (task: Task) => {
          this.task = task;
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate,
            assignedTo: task.assignedTo,
          });
        },
        error: (error) => {
          console.error('Error fetching task details:', error);
        }
      });
    } else {
      console.error('Task ID is null.');
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid && this.taskId !== null) {
      const formData = this.taskForm.value;
      // Update task details
      this.taskService.updateTask(this.taskId, formData).subscribe(
        response => {
          console.log('Task updated successfully:', response);
          // Optionally, redirect to task details page
        },
        error => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      console.error('Form is invalid or Task ID is null. Please fill in all required fields.');
    }
  }
}
