import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../modules/navbar/navbar.component';
import { SidebarComponent } from '../modules/sidebar/sidebar.component';



@NgModule({
  declarations: [NavbarComponent,SidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent,SidebarComponent],
})
export class SharedModule { }
