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
import { HolidayManagementModule } from './modules/holiday-management/holiday-management.module';

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
HttpClientModule,    ReactiveFormsModule,
    FormsModule,
  HolidayManagementModule  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
