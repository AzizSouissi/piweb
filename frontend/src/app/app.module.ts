import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './modules/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleModule } from './modules/role/role.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserModule } from './modules/user/user.module';
import { TokenInterceptor } from './core/interceptor/token-inter.interceptor';
import { ResetpasswordComponent } from './modules/resetpassword-component/resetpassword.component';
import { NewpasswordComponent } from './modules/newpassword/newpassword.component';
import { EmailsendedComponent } from './modules/emailsended/emailsended.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    HomeComponent,
    ResetpasswordComponent,
    NewpasswordComponent,
    EmailsendedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RoleModule,
    UserModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
