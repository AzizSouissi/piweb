import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './FrontOffice/header/header.component';
import { FooterComponent } from './FrontOffice/footer/footer.component';
import { BodyFrontComponent } from './FrontOffice/body-front/body-front.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { AttendanceRecordManagementModule } from './attendance-record-management/attendance-record-management.module';
import { AttendanceTrackingService } from './core/services/attendance-tracking.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyFrontComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AttendanceRecordManagementModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
