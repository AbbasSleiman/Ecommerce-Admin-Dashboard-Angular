import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticateService } from '../../guards/authenticate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAdmin: boolean | undefined;

  constructor(private authService: AuthenticateService) {}

  // On Initialize, assign http Response to isAdmin
  ngOnInit(): void {
    this.getIsUserAdmin(this.authService.getUserId());
  }

  getIsUserAdmin(id: number | null) {
    this.authService.isUserAdmin(id).subscribe(response => {
      this.isAdmin = response;
    });
  }
}
