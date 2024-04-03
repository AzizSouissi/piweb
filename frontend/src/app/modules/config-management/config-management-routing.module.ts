import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListConfigComponent } from './list-config/list-config.component';
import { AddConfigComponent } from './add-config/add-config.component';
import { UpdateConfigComponent } from './update-config/update-config.component';

const routes: Routes = [
  {
    path: '',
    component: ListConfigComponent,
  },
  {
    path: 'addConfig',
    component: AddConfigComponent,
  },
  {
    path: 'updateConfig',
    component: UpdateConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigManagementRoutingModule {}
