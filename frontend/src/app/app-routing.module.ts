import { PayrollManagementModule } from './modules/payroll-management/payroll-management.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ConfigManagementModule } from './../app/modules/config-management/config-management.module';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'config',
        loadChildren: () =>
          import(
            './../app/modules/config-management/config-management.module'
          ).then((m) => m.ConfigManagementModule),
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import(
            './../app/modules/payroll-management/payroll-management.module'
          ).then((m) => m.PayrollManagementModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
