import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigManagementRoutingModule } from './config-management-routing.module';
import { AddConfigComponent } from './add-config/add-config.component';
import { ListConfigComponent } from './list-config/list-config.component';
import { UpdateConfigComponent } from './update-config/update-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddConfigComponent,
    ListConfigComponent,
    UpdateConfigComponent,
  ],
  imports: [
    CommonModule,
    ConfigManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ConfigManagementModule {}
