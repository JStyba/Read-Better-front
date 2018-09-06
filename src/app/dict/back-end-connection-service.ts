import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class BackEndConnectionService {
  constructor(private http: HttpClient) {
  }

  newArray = [];

  getResponse(word) {
    this.newArray = [];
    const username = 'user';
    const password = 'password1';
    const auth = btoa(username + ':' + password);
    const params = new HttpParams().set('word', word);
    const headers = {'FOO': 'foo', 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cache-Control': 'no-cache'};
    this.http.get('http://localhost:8080/', {params, headers}).subscribe(res => {
      const evilResp = Object.values(res['definitions']);
      for (const prop in evilResp) {
        if (evilResp !== null) {

          this.newArray.push(evilResp[prop]);
        }
      }
    });
    return (this.newArray);
  }

}
