import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable()
export class WordTranslationService {
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

