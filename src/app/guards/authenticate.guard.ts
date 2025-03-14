import { CanActivateFn } from '@angular/router';
import { User } from '../models/User';
import { inject } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { Observable } from 'rxjs';
import { response, Router } from 'express';

export const authenticateGuard: CanActivateFn = (route, state) => {
  let isAdmin: boolean = false;

  // Inject dependencies
  const authService = inject(AuthenticateService);
  const router: Router = inject(Router);

  // const isAuthenticated$: Observable<boolean> = null;
  const isAdmin$: Observable<boolean> = authService.isUserAdmin(authService.getUserId());

  isAdmin$.subscribe(response => {
    isAdmin = response;
  });

  if (isAdmin) {
    return true;
  } else {
    return false;
  }

  // // assign User Observable from the Service
  // const userRole: Observable<string> =
  //   inject(AuthenticateService).getUserRole(1);

  // // subscribe to the Observable, and assign response to the role
  // userRole.subscribe(response => { role = response});
};

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   if (authService.isAuthenticated()) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// };
