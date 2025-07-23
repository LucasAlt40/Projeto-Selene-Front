import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('auth_token');

  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const excludedEndpoints = ['/auth'];

  const isExcluded = excludedEndpoints.some(endpoint =>
    req.url.includes(endpoint)
  );

  if (!isApiRequest || isExcluded) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
