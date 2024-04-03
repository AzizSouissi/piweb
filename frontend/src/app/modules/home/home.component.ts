import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule { }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

}