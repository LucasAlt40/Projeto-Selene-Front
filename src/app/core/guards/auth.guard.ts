import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_, state): boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService);


  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
