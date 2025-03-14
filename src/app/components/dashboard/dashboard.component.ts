import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { NavbarDashboardComponent } from '../../shared/navbar-dashboard/navbar-dashboard.component';
import { AuthenticateService } from '../../guards/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [IonButton, NavbarDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  
    constructor(
      private authService: AuthenticateService,
      private router: Router
    ) {}


  ngOnInit(): void {
  }

  // deAuthenticate the User and navigate to landing
  logout() {
    console.log("te")
    this.authService.clearUserId();
    this.router.navigate(['']);
  }
}
