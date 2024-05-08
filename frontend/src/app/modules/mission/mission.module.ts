import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissionRoutingModule } from './mission-routing.module';



@NgModule({
  declarations: [
    AddMissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MissionRoutingModule
    
  ]
})
export class MissionModule { }
