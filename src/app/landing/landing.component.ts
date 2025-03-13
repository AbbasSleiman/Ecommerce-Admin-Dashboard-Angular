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
import { User } from '../models/User';


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
  user: User | undefined;
  isAdmin: boolean | undefined;

  constructor(private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.getUserData(1);
  }

  getUserData(id: number) {
    this.authService.isUserAdmin(id).subscribe(response => {
      this.isAdmin = response;
      console.log(this.isAdmin);
    })
  }
}
