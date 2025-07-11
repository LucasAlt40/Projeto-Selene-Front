import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedEndpoints = ['/auth'];

  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const isExcludedEndpoint = excludedEndpoints.some((endpoint) =>
    req.url.includes(endpoint)
  );
  if (isApiRequest && !isExcludedEndpoint) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic base64`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
