import {User} from '../model/user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthenticationService} from './authentication-service';
import {DataService} from './data-service';
import {Injectable} from '@angular/core';
import {Dict} from '../model/dict';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
    newUserArray;
    dict: Dict[];
  constructor(private http: HttpClient, private auth: AuthenticationService, private ds: DataService) {
  }
  register(user: User) {
    return this.http.post(this.ds.urlToBackend + `/users/register?access_token=`
      + localStorage.getItem('tmp_token'), user);
  }

  getAllUsers() {
    this.newUserArray = [];
    this.http.get(this.ds.urlToBackend + '/admin/users/?access_token='
      + localStorage.getItem('token'), ).subscribe(res => {
      for (const prop in res) {
        if (res !== null) {
          this.newUserArray.push(Object.values(res[prop]));
        }
      }
    });
    return (this.newUserArray);
  }
  getLocalDict () {
    return this.http.get<Dict[]>(this.ds.urlToBackend + '/entry/read-dict/?access_token='
      + localStorage.getItem('token'), ).pipe(map( res => {
       return this.dict = res;
    }));
  }
}
