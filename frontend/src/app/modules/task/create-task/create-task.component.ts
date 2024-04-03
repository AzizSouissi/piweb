
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/tasks.service';
import { TaskPriority, TaskStatus } from '../../../core/models/Task';
import { Employee } from '../../../core/models/emloyee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;
  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);
  name: string = ''; // Default employee name
  description: string='';

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdAt: [''],
      updatedAt: [''],
      name: [''] // Assuming this is for assigning users to tasks
    });
  }

  ngOnInit(): void {
    // Initialize any form data or logic here
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      formData.createdBy = this.name; // Set createdBy to default employee id
      this.taskService.createTask(formData).subscribe(
        response => {
          console.log('Task created successfully:', response);
          // Reset the form after successful submission
          this.taskForm.reset();
        },
        error => {
          console.error('Error creating task:', error);
        }
      );
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }
}

