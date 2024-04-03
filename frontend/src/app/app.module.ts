import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideClientHydration } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskModule } from "./modules/task/task.module";
//import {CanvasJSChart} from 'canvasjs';


const routes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
   // NavbarComponent,

    //CanvasJSChart,
  
   // TaskComponent,
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
