import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './modules/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserModule } from './modules/user/user.module';
import { TokenInterceptor } from './core/interceptor/token-inter.interceptor';
import { ResetpasswordComponent } from './modules/resetpassword-component/resetpassword.component';
import { NewpasswordComponent } from './modules/newpassword/newpassword.component';
import { EmailsendedComponent } from './modules/emailsended/emailsended.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AttendanceManagementModule } from './modules/attendance-management/attendance-management.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ConfigManagementModule } from './modules/config-management/config-management.module';
import { HolidayManagementModule } from './modules/holiday-management/holiday-management.module';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { HomeComponent } from './modules/home/home.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { RoleModule } from './modules/role/role.module';
import { TaskManagementModule } from './modules/task/task.module';
import { ProjectManagementModule } from './modules/project-management/project-management.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProfileComponent } from './modules/profile/profile.component';
import { ConfigManagementModule } from './modules/config-management/config-management.module';
import { PayrollManagementModule } from './modules/payroll-management/payroll-management.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    ResetpasswordComponent,
    NewpasswordComponent,
    EmailsendedComponent,
    NotFoundComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfigManagementModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RoleModule,
    UserModule,
    AttendanceManagementModule,
    ProjectManagementModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ConfigManagementModule,
    HolidayManagementModule,
    TaskManagementModule,
    DragDropModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
