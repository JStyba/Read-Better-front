import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class TokenInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = localStorage.getItem('token');
    // if (currentUser) {
    //   request = request.clone({
    //     setHeaders: {
    //       access_token: currentUser
    //     }
    //   });
    // }

    return next.handle(request);
  }
}
