
import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  sendToBackend(table) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(`http://localhost:8080/entry/def?access_token=`
      + localStorage.getItem('token'), table).subscribe();
  }
  timestampToDate (entryDate: Date) {
    const clock = entryDate.getTime() * 1000;
    const hours = entryDate.getHours();
    const minutes = '0' + entryDate.getMinutes();
    const seconds = '0' + entryDate.getSeconds();
    const day = entryDate.getDate();
    const month = entryDate.getMonth() + 1;
    const year = entryDate.getFullYear();
    return  day + '-' + month + '-' + year  + ' at ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }
}
