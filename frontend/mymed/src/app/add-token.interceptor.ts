import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalstateService } from './globalStateService';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

token: string='';

  constructor(private stateSer: GlobalstateService) {
    this.stateSer.gloabalState.subscribe((state)=>{
      this.token = state.token

    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const clone = request.clone({
     setHeaders: {
       authorization: 'Bearer ' + this.token,
     },
   });

    return next.handle(clone);
  }
}
