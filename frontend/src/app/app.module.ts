import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideClientHydration } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./modules/home/home.component";
import { NavbarComponent } from "./modules/navbar/navbar.component";
import { SidebarComponent } from "./modules/sidebar/sidebar.component";
import { TaskComponent } from "./modules/task/task.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskModule } from "./modules/task/task.module";
//import {CanvasJSChart} from 'canvasjs';


const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    //CanvasJSChart,
    HomeComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes),
    AppRoutingModule,
    //CanvasJSChart,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TaskModule
  ],

  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
