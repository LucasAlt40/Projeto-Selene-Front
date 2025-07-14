import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('auth_token'); 
  const excludedEndpoints = ['/auth'];
  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const isExcludedEndpoint = excludedEndpoints.some((endpoint) =>
    req.url.includes(endpoint)
  );

  if (isApiRequest && !isExcludedEndpoint && token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
