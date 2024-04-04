import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListTaskComponent } from './list-task/list-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateTaskComponent } from './update-task/update-task.component';

const routes: Routes = [
  { path: '', component: ListTaskComponent },
  { path: 'AddTask', component: AddTaskComponent },
  { path: 'UpdateTask/:id', component: UpdateTaskComponent }
];

@NgModule({
  declarations: [
    AddTaskComponent,
    ListTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class TaskManagementModule { }