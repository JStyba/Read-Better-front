import {map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DataService} from './data-service';

@Injectable()
export class WebScrapeService {
  constructor(private http: HttpClient, private ds: DataService) {
  }


  getStringedWeb(url) {
    const params = new HttpParams().set('url', url);
    const headers = {responseType: 'json'};
    return this.http.get(this.ds.urlToBackend + '/scrape?access_token='
      + localStorage.getItem('token'), {headers, params: params})
      .pipe(map(res => res['scrapedWebString']));
  }
}

