import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {DataService} from './data-service';
import {UserService} from './user-service';
@Injectable()
export class AuthenticationService {
  private _loggedIn = false;
  constructor (private http: HttpClient, private router: Router, private ds: DataService) {}

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  login(username: string, password: string ) {
    const bodySerialized = 'grant_type=password&password=' + password + '&username=' + username;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa(this.ds.secret));
    return this.http.post
    (this.ds.urlToBackend + '/oauth/token', bodySerialized, {headers: headers});
  }
getToken() {
    const password = this.ds.adminPassword;
    const username = this.ds.adminLogin;
  const bodySerialized = 'grant_type=password&password=' + password + '&username=' + username;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic ' + btoa(this.ds.secret));
   return this.http.post
   (this.ds.urlToBackend + '/oauth/token', bodySerialized, {headers: headers});
   }
   }
