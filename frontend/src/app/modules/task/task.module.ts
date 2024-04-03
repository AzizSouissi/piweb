import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../task/create-task/create-task.component';
import { ListTaskComponent } from '../task/list-task/list-task.component';
import { AddTaskComponent } from '../task/add-task/add-task.component';
import { UpdateTaskComponent } from '../task/update-task/update-task.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateTaskComponent,
    ListTaskComponent,
    AddTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    CommonModule,
    TaskModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TaskModule { }
