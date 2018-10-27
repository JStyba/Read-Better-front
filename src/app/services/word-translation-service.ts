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
    const params = new HttpParams().set('word', word);
    const headers = {'FOO': 'foo', 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cache-Control': 'no-cache'};
    this.http.get('https://secret-dawn-55833.herokuapp.com/entry/translate/?access_token='
      + localStorage.getItem('token')
      , {params, headers}).subscribe(res => {
        const evilResp = Object.values(res['definitions']);
      for (const prop in evilResp) {
        if (evilResp !== null) {
          this.newArray.push(Object.values(evilResp[prop]));
        }
      }
          });
    return (this.newArray);
  }


}

