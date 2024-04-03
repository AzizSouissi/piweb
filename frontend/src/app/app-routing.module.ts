import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { ResetpasswordComponent } from './modules/resetpassword-component/resetpassword.component';
import { NewpasswordComponent } from './modules/newpassword/newpassword.component';
import { EmailsendedComponent } from './modules/emailsended/emailsended.component';
import { RoleGuard } from './core/guards/role-guard.guard';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'resetpassword',
    component: ResetpasswordComponent
  }, 
  {
    path : 'newpassword',
    component : NewpasswordComponent
  },
  {
    path : 'emailsended', component : EmailsendedComponent
  },
  {
    path : 'notfound', component : NotFoundComponent
  },

  {path: 'home',loadChildren:() =>
  import('./modules/home/home.module').then(m=>m.HomeModule) },

  {path: 'users',loadChildren:() =>
  import('./modules/user/user.module').then(m=>m.UserModule) },

  {path: 'roles',loadChildren:() =>
    import('./modules/role/role.module').then(m=>m.RoleModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
