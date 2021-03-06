import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthenticationService} from './authentication-service';
import {DataService} from './data-service';
import {split} from 'ts-node';
import {stringify} from 'querystring';
import {map} from 'rxjs/operators';
import {Entry} from '../model/entry';

const TOKEN = 'token';
const REFRESH_TOKEN = 'refresh_token';
const USERNAME = 'username';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  constructor(private http: HttpClient, private auth: AuthenticationService, private ds: DataService) {
  }
  newStringEntryArrayToLearn = [];
  newEntryArrayToLearn = [];
  newEntryArray = [];
  newStringEntryArray: Entry[] = [];
  newBrowsingHistoryArray = [];

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  setUsername(username: string): void {
    localStorage.setItem(USERNAME, username);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) !== null;
  }


  sendToBackend(table) {
    const params = new HttpParams();
    const username = localStorage.getItem('username');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.ds.urlToBackend + `/entry/def?access_token=`
      + localStorage.getItem('token') + '&username=' + username, table).subscribe(res => {
      console.log(res);
    });
  }

  timestampToDate(entryDate: Date) {
    const clock = entryDate.getTime() * 1000;
    const hours = entryDate.getHours();
    const minutes = '0' + entryDate.getMinutes();
    const seconds = '0' + entryDate.getSeconds();
    const day = entryDate.getDate();
    const month = entryDate.getMonth() + 1;
    const year = entryDate.getFullYear();
    return day + '-' + month + '-' + year + ' at ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  getEntriesFromDatabase() {
    this.newStringEntryArray = [];
    this.newEntryArray = [];
    const params = new HttpParams().set('username', localStorage.getItem('username'));
    this.http.get(this.ds.urlToBackend + '/entry/get-entries/?access_token='
      + localStorage.getItem('token'), {params: params}).subscribe(res => {
      for (const prop in res) {
        if (res !== null) {
          this.newEntryArray.push(Object.values(res[prop]));
        }
      }
      for (let i = 0; i < this.newEntryArray.length; i++) {
        console.log(this.newEntryArray[i]);
        this.newStringEntryArray.push(new Entry(
          this.newEntryArray[i][0]
          , this.newEntryArray[i][1]
          , this.newEntryArray[i][5]
          , this.newEntryArray[i][4]
          , this.newEntryArray[i][2]));
      }
    });
    return (this.newStringEntryArray);
  }

  getEntriesFromDatabaseDef() {
    this.newStringEntryArray = [];
    this.newEntryArray = [];
    const params = new HttpParams().set('username', localStorage.getItem('username'));
    this.http.get(this.ds.urlToBackend + '/entry/get-entries-with-def/?access_token='
      + localStorage.getItem('token'), {params: params}).subscribe(res => {
      for (const prop in res) {
        if (res !== null) {
          this.newEntryArray.push(Object.values(res[prop]));
        }
      }
      for (let i = 0; i < this.newEntryArray.length; i++) {
        this.newStringEntryArray.push(new Entry(
          this.newEntryArray[i][0]
          , this.newEntryArray[i][1]
          , this.newEntryArray[i][2]
          , this.newEntryArray[i][3]));
      }
    });
    return (this.newStringEntryArray);
  }

  getBrowsingHistoryFromDatabase() {
    this.newBrowsingHistoryArray = [];
    const params = new HttpParams().set('username', localStorage.getItem('username'));
    this.http.get(this.ds.urlToBackend + '/users/get-browsing-history/?access_token='
      + localStorage.getItem('token'), {params: params}).subscribe(res => {
      for (const prop in res) {
        if (res !== null) {
          this.newBrowsingHistoryArray.push(Object.values(res[prop]));
        }
      }
    });
    return (this.newBrowsingHistoryArray);
  }

  sendUrlToBackend(url) {
    const params = new HttpParams().set('url', url);
    const username = localStorage.getItem('username');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.ds.urlToBackend + `/users/save-url?access_token=`
      + localStorage.getItem('token') + '&username=' + username, {params: params}).subscribe(res => {
      console.log(res);
    });
  }

  removeUrlFromBackend(url) {
    const params = new HttpParams().set('username', localStorage.getItem('username'));
    return this.http.delete(this.ds.urlToBackend + '/users/remove-link?access_token='
      + localStorage.getItem('token') + '&url=' + url, {params: params});
  }

  removeEntryFromBackend(word) {
    const params = new HttpParams().set('username', localStorage.getItem('username'));
    return this.http.delete(this.ds.urlToBackend + '/entry/remove-entry?access_token='
      + localStorage.getItem('token') + '&word=' + word, {params: params});
  }

  recordLogin() {
    const loggedIn = localStorage.getItem('loggedInAt').replace('T', ' ').split('\.')[0];
    const loggedOut = new Date().toISOString().replace('T', ' ').split('\.')[0];
    const username = localStorage.getItem('username');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.ds.urlToBackend + `/users/record-session?access_token=`
      + localStorage.getItem('token') + '&loggedIn=' + loggedIn + '&loggedOut=' + loggedOut + '&username=' + username).subscribe(res => {
    });
  }

  recordLoginCount() {
    const username = localStorage.getItem('username');
    return this.http.get(this.ds.urlToBackend + `/users/record-login-count?access_token=`
      + localStorage.getItem('token') + '&username=' + username).subscribe(res => {
    });
  }
  recordLearning (word: string, isCorrect: boolean) {
    const username = localStorage.getItem('username');
    return this.http.get(this.ds.urlToBackend + `/entry/learn?access_token=`
      + localStorage.getItem('token') + '&word=' + word + '&correct=' + isCorrect + '&username=' + username).subscribe(res => {
    });
  }

  getEntriesFromDatabaseToLearn() {
    this.newStringEntryArrayToLearn = [];
    this.newEntryArrayToLearn = [];
    const params = new HttpParams().set('username', localStorage.getItem('username'));
    this.http.get(this.ds.urlToBackend + '/entry/get-words-to-learn/?access_token='
      + localStorage.getItem('token'), {params: params}).subscribe(res => {
      for (const prop in res) {
        if (res !== null) {
          this.newEntryArrayToLearn.push(Object.values(res[prop]));
        }
      }
      for (let i = 0; i < this.newEntryArrayToLearn.length; i++) {
        console.log(this.newEntryArrayToLearn[i]);
        this.newStringEntryArrayToLearn.push(new Entry(
          this.newEntryArrayToLearn[i][0]
          , this.newEntryArrayToLearn[i][1]
          , this.newEntryArrayToLearn[i][5]
          , this.newEntryArrayToLearn[i][4]
          , this.newEntryArrayToLearn[i][2]));
      }
    });
    return (this.newStringEntryArrayToLearn);
  }
}
