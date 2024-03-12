import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/Role';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.css'
})
export class ListRoleComponent implements OnInit{
  roles : Role[] =[]

  ngOnInit(): void {
    this.getRoles();
  }
 constructor(private roleService: RoleService){}

 getRoles() {
  this.roleService.getRoles().subscribe(
      (res: Role[]) => {
          this.roles=res
          console.log(res);
      },
      (err: any) => {
          console.log(err);
      }
  );
}


  


}
