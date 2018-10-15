import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
@Injectable()
export class AuthenticationService {
  constructor (private http: HttpClient, private router: Router) {}

  login(username: string, password: string ) {

    // const bodySerialized = 'grant_type=password&password=admin&username=admin';
    const bodySerialized = 'grant_type=password&password=' + password + '&username=' + username;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa('jerry:jerry-secret'));
    return this.http.post('https://secret-dawn-55833.herokuapp.com/oauth/token', bodySerialized, {headers: headers});
  }
getToken() {
    const password = 'magus';
    const username = 'magus';
  const bodySerialized = 'grant_type=password&password=' + password + '&username=' + username;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic ' + btoa('jerry:jerry-secret'));
   return this.http.post('https://secret-dawn-55833.herokuapp.com/oauth/token', bodySerialized, {headers: headers});
}
  logout() {
    localStorage.clear();
  }
}
