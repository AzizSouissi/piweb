import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeductionRoutingModule } from './deduction-routing.module';
import { AddDeductionComponent } from './add-deduction/add-deduction.component';


@NgModule({
  declarations: [
    AddDeductionComponent
  ],
  imports: [
    CommonModule,
    DeductionRoutingModule
  ]
})
export class DeductionModule { }
