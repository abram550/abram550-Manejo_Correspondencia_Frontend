// src/app/interceptors/http-response.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body = event.body;

          if (body?.employees) {
            event = event.clone({ body: body.employees });
          } else if (body?.employeeTypes) {
            event = event.clone({ body: body.employeeTypes });
          } else if (body?.employee) {
            event = event.clone({ body: body.employee });
          }
        }
        return event;
      })
    );
  }
}
