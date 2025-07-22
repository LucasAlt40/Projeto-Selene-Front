import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const messageService = inject(MessageService);
  const cookieService = inject(CookieService);

  const token = cookieService.get('auth_token');

  const excludedEndpoints = ['/auth'];
  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const isExcluded = excludedEndpoints.some((endpoint) =>
    req.url.includes(endpoint)
  );

  if (!isApiRequest) {
    return next(req);
  }

  if (isExcluded) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  } else {
    router.navigate(['/login']);
    messageService.add({
      severity: 'info',
      summary: 'Sessão Expirada',
      detail: 'Sua sessão expirou, faça login novamente.',
      life: 5000,
    });
    return next(req);
  }
};
