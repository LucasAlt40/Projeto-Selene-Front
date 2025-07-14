import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedEndpoints = ['/auth'];
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWNhcy5hbHQ0MEBnbWFpbC5jb20iLCJleHAiOjE3NTI0NTcxNzQsImlhdCI6MTc1MjQ1MzU3NH0.KkJdfsqkS2RhMoSpGhCQQIuM4Hq2dlXOl7iUzvf4QaM';

  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const isExcludedEndpoint = excludedEndpoints.some((endpoint) =>
    req.url.includes(endpoint)
  );
  if (isApiRequest && !isExcludedEndpoint) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
