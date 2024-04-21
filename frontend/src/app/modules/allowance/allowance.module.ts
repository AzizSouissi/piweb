import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllowanceRoutingModule } from './allowance-routing.module';
import { AddAllowanceComponent } from './add-allowance/add-allowance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddAllowanceComponent
  ],
  imports: [
    CommonModule,
    AllowanceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AllowanceModule { }
