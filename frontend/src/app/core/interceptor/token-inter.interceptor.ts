import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
