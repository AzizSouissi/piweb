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
import { AllowanceModule } from './modules/allowance/allowance.module';
import { SendcodeComponent } from './modules/sendcode/sendcode.component';

import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RecruitementAssistantService } from './core/services/recruitementAssistant.service';
import { RecruitementAssistantComponent } from './modules/recruitement-assistant/recruitement-assistant.component';

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
    SendcodeComponent,
    RecruitementAssistantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RoleModule,
    ConfigManagementModule,
    PayrollManagementModule,
    UserModule,
    AttendanceManagementModule,
    ProjectManagementModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ConfigManagementModule,
    HolidayManagementModule,
    TaskManagementModule,
    DragDropModule,
    AllowanceModule,
    ToastModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([]),
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
    RecruitementAssistantService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
