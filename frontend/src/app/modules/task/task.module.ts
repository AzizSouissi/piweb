import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../../../../../piweb-attendanceRecord-Management/frontend/src/app/modules/task/create-task/create-task.component';
import { ListTaskComponent } from '../../../../../piweb-attendanceRecord-Management/frontend/src/app/modules/task/list-task/list-task.component';
import { AddTaskComponent } from '../../../../../piweb-attendanceRecord-Management/frontend/src/app/modules/task/add-task/add-task.component';
import { UpdateTaskComponent } from '../../../../../piweb-attendanceRecord-Management/frontend/src/app/modules/task/update-task/update-task.component';
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
