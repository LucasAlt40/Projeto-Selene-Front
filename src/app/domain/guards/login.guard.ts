import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { isTokenExpired } from '../utils';

export const loginGuard: CanActivateFn = (_, __): boolean => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('auth_token');

  if (token && !isTokenExpired(token)) {
    router.navigate(['/'])
    return false;
  }

  return true; 
};

