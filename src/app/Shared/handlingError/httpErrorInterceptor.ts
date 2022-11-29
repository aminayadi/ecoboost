import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { unknowError } from './unknowError';

export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Errorrrr: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errorMsg = `Errorrrrr Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
          return throwError(()=>(new unknowError(errorMsg)) );
        })
      )
  }
}
