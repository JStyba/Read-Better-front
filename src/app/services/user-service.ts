
import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication-service';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  constructor (private http: HttpClient, private auth: AuthenticationService) {}
  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) !== null;
  }
  register(user: User) {
   return this.http.post(`https://secret-dawn-55833.herokuapp.com/users/register?access_token=`
     + localStorage.getItem('token'), user);
     }
     getToken () {
       this.auth.getToken().subscribe( res => {
         localStorage.setItem('token', res['access_token']);
       });
     }
}
