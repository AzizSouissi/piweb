import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoleComponent } from './add-role/add-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { ListRoleComponent } from './list-role/list-role.component';
import { RoleRoutingModule } from './role-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddRoleComponent,
    UpdateRoleComponent,
    ListRoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RoleModule { }
