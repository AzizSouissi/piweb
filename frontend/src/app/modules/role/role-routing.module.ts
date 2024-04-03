import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ListRoleComponent } from "./list-role/list-role.component";
import { AddRoleComponent } from "./add-role/add-role.component";
import { UpdateRoleComponent } from "./update-role/update-role.component";
import { RoleGuard } from "../../core/guards/role-guard.guard";

const routes: Routes = [
    { path: '', component: ListRoleComponent, canActivate: [RoleGuard] },
    { path: 'add', component: AddRoleComponent },
    { path: 'update/:id', component: UpdateRoleComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RoleRoutingModule { }