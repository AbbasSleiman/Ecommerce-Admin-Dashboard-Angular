import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { IonButton } from '@ionic/angular/standalone';
import { NavbarDashboardComponent } from "../../shared/navbar-dashboard/navbar-dashboard.component";

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, IonButton, NavbarDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
