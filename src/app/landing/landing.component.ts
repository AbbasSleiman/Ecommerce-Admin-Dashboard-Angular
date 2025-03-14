import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import {
  IonContent,
  IonFooter,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthenticateService } from '../guards/authenticate.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [NavbarComponent, IonContent, IonFooter, IonTitle, IonToolbar],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  user: User | undefined;
  isAdmin: boolean | undefined;

  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('user Id', this.authService.getUserId());
  }

  getUserData(id: number) {
    this.authService.isUserAdmin(id).subscribe(response => {
      this.isAdmin = response;
      console.log(this.isAdmin);
    });
  }

}
