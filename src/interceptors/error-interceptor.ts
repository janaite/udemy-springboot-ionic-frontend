import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    console.log("interceptor pass");
    return next.handle(req).catch((error, caught) => {

        let errorObj = error;
        if(errorObj.error) {
            errorObj = errorObj.error;
        }

        if(!errorObj.status) {  //its text not json
            errorObj = JSON.parse(errorObj);
        }

        console.log("Error detected!");
        console.log(errorObj);

        return Observable.throw(errorObj);
    }) as any;
  }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};