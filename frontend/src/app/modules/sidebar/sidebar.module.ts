import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component'; // Import SidebarComponent

@NgModule({
  declarations: [
    SidebarComponent // Declare SidebarComponent here
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
