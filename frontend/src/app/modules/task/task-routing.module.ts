import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateTaskComponent } from '../../../../../piweb-attendanceRecord-Management/frontend/src/app/modules/task/update-task/update-task.component';
import { AddTaskComponent } from '../../../../../piweb-attendanceRecord-Management/frontend/src/app/modules/task/add-task/add-task.component';
import { ListTaskComponent } from '../../../../../piweb-attendanceRecord-Management/frontend/src/app/modules/task/list-task/list-task.component';
import { CreateTaskComponent } from '../../../../../piweb-attendanceRecord-Management/frontend/src/app/modules/task/create-task/create-task.component';

const routes: Routes = [
  { path: 'listTasks', component: ListTaskComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'updateTask/:id', component: UpdateTaskComponent }, // Assuming task ID is passed as a route parameter
  { path: 'createTask', component: CreateTaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskManagementRoutingModule {}
