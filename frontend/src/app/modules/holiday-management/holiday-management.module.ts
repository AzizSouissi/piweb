import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListHolidayComponent } from './list-holiday/list-holiday.component';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateHolidayComponent } from './update-holiday/update-holiday.component';

const routes: Routes = [
  {path:'',component:ListHolidayComponent},
  {path:'AddHoliday',component:AddHolidayComponent},
  {path:'UpdateHoliday/:id',component:UpdateHolidayComponent}

  
]

@NgModule({
  declarations: [
    AddHolidayComponent,ListHolidayComponent, UpdateHolidayComponent
  ],
  imports: [
    
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class HolidayManagementModule { }
