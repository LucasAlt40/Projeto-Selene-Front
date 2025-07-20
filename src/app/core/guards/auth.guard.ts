import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { isTokenExpired } from '../utils';

export const authGuard: CanActivateFn = (_, state): boolean | UrlTree => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('auth_token');

  if (token && !isTokenExpired(token)) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
