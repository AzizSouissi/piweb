import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../task/create-task/create-task.component';
import { AddTaskComponent } from '../task/add-task/add-task.component';
import { UpdateTaskComponent } from '../task/update-task/update-task.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task.component';
import { TaskManagementRoutingModule } from './task-routing.module';
import { ListTaskComponent } from './list-task/list-task.component';



@NgModule({
  declarations: [
    CreateTaskComponent,
    ListTaskComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    TaskManagementRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TaskModule { }
