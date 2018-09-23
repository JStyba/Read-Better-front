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
    const username = 'user';
    const password = 'password1';
    const auth = btoa(username + ':' + password);
    const params = new HttpParams().set('url', url);
    const headers = {responseType: 'json'};
    return this.http.get('http://localhost:8080/scrape', {params: params, headers})
      .pipe(map(res => res['scrapedWebString']));
  }
}
