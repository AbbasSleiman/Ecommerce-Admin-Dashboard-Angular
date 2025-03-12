import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthenticateService } from '../guards/authenticate.service';

@Component({
  selector: 'app-landing',
  imports: [
    NavbarComponent,
    IonContent,
    IonFooter,
    IonTitle,
    IonToolbar,
    IonHeader,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  constructor(private authService: AuthenticateService) {}

  ngOnInit() {
    this.authService.isAdmin(1).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
