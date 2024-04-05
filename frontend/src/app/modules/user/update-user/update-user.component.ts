import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Role } from '../../../core/models/Role';
import { RoleService } from '../../../core/services/role.service';
import { EncryptionService } from '../../../core/services/encryption.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  id!: string;
  myForm: FormGroup;
  user!: any;
  roles: Role[] = [];
  selectedRole: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private encryptionService: EncryptionService,
    private roleService: RoleService,
    private route: ActivatedRoute
  ) {
    this.myForm = this.fb.group({
      id: [''],
      firstname: ['', [Validators.pattern('[A-Za-z]+'), Validators.required]],
      lastname: ['', [Validators.pattern('[A-Za-z]+'), Validators.required]],
      email: ['', [Validators.email]],
      job: ['', [Validators.pattern('[A-Za-z ]*')]],
      number: ['', [Validators.pattern('^[0-9]{8}$')]],
      address: ['', [Validators.required]],
      birthday: ['', [this.dateNaissanceValidator(18)]],
      degree: ['', [Validators.required]],
    });
  }

  isSelectedRole(role: Role): boolean {
    return this.selectedRole.includes(role.id);
  }

  onroleSelect(role: Role, event: any) {
    if (event.target.checked) {
      this.selectedRole.push(role.id);
    } else {
      const index = this.selectedRole.indexOf(role.id);
      if (index !== -1) {
        this.selectedRole.splice(index, 1);
      }
    }
    console.log(this.selectedRole);
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (res: Role[]) => {
        console.log(res);
        this.roles = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  dateNaissanceValidator(minYears: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputDate = new Date(control.value);
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - minYears);

      if (inputDate >= currentDate) {
        return { dateNaissanceInvalid: { value: control.value } };
      }

      return null;
    };
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.getUserById(id);
    } else {
      console.error('ID parameter is null');
    }
    this.getRoles();
  }

  getUserById(id: string) {
    this.userService.getUserById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.user = res;
        this.selectedRole = this.user.roleId;
        this.myForm.patchValue({
          id: this.user.id,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          job: this.user.job,
          number: this.user.number,
          address: this.user.address,
          birthday: this.user.birthday,
          degree: this.user.degree,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    const user = this.myForm.value;
    user.roleId = this.selectedRole;
    console.log(user);
    this.userService.updateUser(user.id, user).subscribe(
      (response) => {
        const authoritiesCrypted = localStorage.getItem('authorities');
        const authorities = this.encryptionService.decrypt(
          authoritiesCrypted!,
          '2f7'
        );
        if (authorities.includes('READ::USER'))
          this.router.navigate(['/users']);
        else this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
}
