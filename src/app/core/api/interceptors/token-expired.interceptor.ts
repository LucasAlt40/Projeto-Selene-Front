import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

function parseJwt(token: string): any | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const expiredTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const messageService = inject(MessageService);
  const authService = inject(AuthService);

  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const excludedEndpoints = ['/auth'];
  const isExcluded = excludedEndpoints.some((endpoint) =>
    req.url.includes(endpoint)
  );

  if (!isApiRequest || isExcluded) {
    return next(req);
  }

  const token = cookieService.get('auth_token');

  if (token) {
    const payload = parseJwt(token);

    if (payload?.exp) {
      const expiresAt = payload.exp * 1000;
      if (Date.now() > expiresAt) {
        messageService.add({
          severity: 'info',
          summary: 'Sessão Expirada',
          detail: 'Sua sessão expirou, faça login novamente.',
          life: 5000,
        });

        authService.logout();

        return throwError(() => new Error('Token expirado'));
      }
    }
  }

  return next(req);
};
