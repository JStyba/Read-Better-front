import {AuthenticationService} from './authentication-service';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
@Injectable()
export class ErrorInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 400) {
        alert('To jest ERROR - prawdopodobnie wciśnięto jakiś przecisk zbyt wiele razy. \n Teraz strona się przeładuje, spokojnie :)');
        location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
