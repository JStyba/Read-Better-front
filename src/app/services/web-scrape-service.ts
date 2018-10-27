import {map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class WebScrapeService {
  constructor(private http: HttpClient) {
  }


  getStringedWeb(url) {
    const params = new HttpParams().set('url', url);
    const headers = {responseType: 'json'};
    return this.http.get('https://secret-dawn-55833.herokuapp.com/scrape?access_token='
      + localStorage.getItem('token'), {headers, params: params})
      .pipe(map(res => res['scrapedWebString']));
  }
}

