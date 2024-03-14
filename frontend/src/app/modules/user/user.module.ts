import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';



@NgModule({
  declarations: [
    ListUserComponent,
    AddUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
