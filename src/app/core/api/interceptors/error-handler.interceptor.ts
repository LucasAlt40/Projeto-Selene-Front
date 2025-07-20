// error-handler.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      const msg = error?.error?.message || 'Erro inesperado ao comunicar com o servidor.';

      messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: msg,
        life: 5000
      });

      return throwError(() => error);
    })
  );
};
