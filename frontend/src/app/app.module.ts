import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AttendanceManagementModule } from './modules/attendance-management/attendance-management.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ProjectManagementModule } from './modules/project-management/project-management.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AttendanceManagementModule,
    ProjectManagementModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
