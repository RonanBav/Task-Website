import { JsonPipe } from '@angular/common';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const logData = localStorage.getItem('account')
  if (logData != null) {
    const tokenData = JSON.parse(logData)
    const token = tokenData.accessToken
    const newReqData = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next(newReqData)
  } else {
    return next(req);
  }
}
