import {map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class WebScrapeService {
  constructor(private http: HttpClient) {
  }

  private scraped;

  getStringedWeb(url) {
    this.scraped = '';
    const params = new HttpParams().set('url', url);
    const headers = {responseType: 'json'};
    return this.http.get('http://localhost:8080/scrape?access_token=' + localStorage.getItem('token'), {headers, params: params})
      .pipe(map(res => res['scrapedWebString']));
    }
}

