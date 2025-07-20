// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const token = cookieService.get('auth_token');
  const excludedEndpoints = [
    '/auth',
    '/event/find',
    'event/event-category/find',
  ];
  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const isExcludedEndpoint = excludedEndpoints.some((endpoint) =>
    req.url.includes(endpoint)
  );

  if (isApiRequest && !isExcludedEndpoint && !token) {
    router.navigate(['/home']);
    messageService.add({
      severity: 'info',
      summary: 'Sessão Expirada',
      detail: 'Sua sessão expirou, faça login novamente.',
      life: 5000,
    });
    return next(req);
  }

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
