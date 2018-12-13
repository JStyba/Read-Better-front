import {AuthenticationService} from './authentication-service';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
@Injectable()
export class ErrorInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 400) {
        console.log(err.status);
        alert('No such user');
        location.reload(false);
        this.router.navigateByUrl('start');
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
