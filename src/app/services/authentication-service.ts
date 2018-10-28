import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from './user-service';
@Injectable()
export class AuthenticationService {
  constructor (private http: HttpClient, private router: Router) {}

  login(username: string, password: string ) {

    const bodySerialized = 'grant_type=password&password=' + password + '&username=' + username;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa('jerry:jerry-secret'));
    return this.http.post
    ('http://localhost:8080/oauth/token', bodySerialized, {headers: headers});
  }
getToken() {
    const password = 'admin';
    const username = 'admin';
  const bodySerialized = 'grant_type=password&password=' + password + '&username=' + username;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic ' + btoa('jerry:jerry-secret'));
   return this.http.post
   ('http://localhost:8080/oauth/token', bodySerialized, {headers: headers});
   }
  logout() {
    localStorage.clear();
  }
  }
