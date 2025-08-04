import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const backendUrl = environment.apiAuth;

  if (req.url.startsWith(backendUrl)) {
    const authReq = req.clone({
      withCredentials: true,
    });
    return next(authReq);
  } else {
    return next(req);
  }
};
