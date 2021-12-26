import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  getToken(): String {
    return localStorage.getItem('token') || '';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.getToken();

    if (token == '') {
      req = req.clone({
        setHeaders: {
          // 'Content-Type' : 'application/json; charset=utf-8',
          // 'Accept'       : 'application/json',
        },
      });
    } else {
      req = req.clone({
        setHeaders: {
          // 'Content-Type' : 'application/json; charset=utf-8',
          // 'Content-Type' : 'multipart/form-data',
          // 'Accept'       : 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);

  }
}
