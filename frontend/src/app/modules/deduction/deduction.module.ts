import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeductionRoutingModule } from './deduction-routing.module';
import { AddDeductionComponent } from './add-deduction/add-deduction.component';
import { ListDeductionComponent } from './list-deduction/list-deduction.component';
import { UpdateDeductionComponent } from './update-deduction/update-deduction.component';


@NgModule({
  declarations: [
    AddDeductionComponent,
    ListDeductionComponent,
    UpdateDeductionComponent
  ],
  imports: [
    CommonModule,
    DeductionRoutingModule
  ]
})
export class DeductionModule { }
