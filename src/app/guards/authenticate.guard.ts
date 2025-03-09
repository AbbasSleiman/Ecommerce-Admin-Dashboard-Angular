import { CanActivateFn } from '@angular/router';

export const authenticateGuard: CanActivateFn = (route, state) => {
  // to Implement Authentication Logic

  return true;
};
