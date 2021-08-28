import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../shared/services/login.service';


@Injectable()

export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.obterToken()}`
    }

    const formDataHeader = {
     // 'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${this.loginService.obterToken()}`
    }

    if (!request.url.includes('login') && !request.url.includes('upload')) {
      request = request.clone({ setHeaders: headers });
    }
    else if (request.url.includes('upload')) {
      request = request.clone({ setHeaders: formDataHeader });
    }

    return next.handle(request);
  }
}
