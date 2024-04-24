import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListHolidayComponent } from './list-holiday/list-holiday.component';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateHolidayComponent } from './update-holiday/update-holiday.component';
import { AgendaComponentComponent } from './agenda-component/agenda-component.component';
import { FullCalendarModule } from '@fullcalendar/angular';

const routes: Routes = [
  {path:'',component:ListHolidayComponent},
  {path:'AddHoliday',component:AddHolidayComponent},
  {path:'UpdateHoliday/:id',component:UpdateHolidayComponent},
  {path:'agenda',component:AgendaComponentComponent}
  
]

@NgModule({
  declarations: [
    AddHolidayComponent,ListHolidayComponent, UpdateHolidayComponent, AgendaComponentComponent
  ],
  imports: [
    
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
FullCalendarModule
  ],
  exports: [RouterModule],
})
export class HolidayManagementModule { }
