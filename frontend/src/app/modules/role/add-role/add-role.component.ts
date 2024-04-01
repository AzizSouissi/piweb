import { Component, OnInit } from '@angular/core';
import { PrivilegeService } from '../../../core/services/privilege.service';
import { RoleService } from '../../../core/services/role.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Privilege } from '../../../core/models/Privilege';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-role',
    templateUrl: './add-role.component.html',
    styleUrls: ['./add-role.component.css']
})

export class AddRoleComponent implements OnInit {
    myForm: FormGroup;
    privileges: Privilege[] = [];
    selectedPrivileges: Privilege[] = [];

    constructor(
        private privilegeService: PrivilegeService,
        private roleService: RoleService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.myForm = this.formBuilder.group({
            roleTitle: ['',[Validators.pattern('[A-Z]+'), Validators.required]]
        });
    }

    onprivilegeSelect(privilege: Privilege, event: any) {
      if (event.target.checked) {
        this.selectedPrivileges.push(privilege);
      } else {
        const index = this.selectedPrivileges.indexOf(privilege);
        if (index !== -1) {
          this.selectedPrivileges.splice(index, 1);
        }
      }
      console.log(this.selectedPrivileges);
    }
    

    ngOnInit(): void {
        this.getPrivileges();
    }

    getPrivileges() {
        this.privilegeService.getPrivileges().subscribe(
            (res: any[]) => {
                console.log(res);
                this.privileges = res;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

   

    onSubmit() {
        const roleTitle = this.myForm.get('roleTitle')?.value;   
        const selectedPrivilegesIds = this.selectedPrivileges.map(privilege => privilege.id);
        const role = {
            name: roleTitle,
            privileges :selectedPrivilegesIds
        };

       

        this.roleService.addRole(role).subscribe(
            (res: any) => {
              this.router.navigate(['/roles']);
             
            },
            (err: any) => {
                console.error('Error adding role:', err);
                
            }
        );
    }
}
