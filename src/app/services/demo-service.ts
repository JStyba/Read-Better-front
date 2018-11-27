import {map} from 'rxjs/operators';
import {Dict} from '../model/dict';
import {Entry} from '../model/entry';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication-service';
import {DataService} from './data-service';
import {Injectable} from '@angular/core';
import {Definition} from '../model/definition';

@Injectable()
export class DemoService {
  constructor(private http: HttpClient, private auth: AuthenticationService, private ds: DataService) {
  }

  tableOfDatabaseWords: Entry[] = [];
  definitions: string[];
  localDictEntry: Dict[];
  search: string;
  dict: Dict[];
  newArr = [];

  getLocalDict() {
    return this.http.get<Dict[]>(this.ds.urlToBackend + '/entry/read-dict/?access_token='
      + localStorage.getItem('token')).pipe(map(res => {
      return this.dict = res;
    }));
  }

  getTranslation(search) {
    this.newArr = [];
    this.getLocalDict().subscribe(res => {
      this.localDictEntry = res;
      const sth: any[] = this.localDictEntry.find(x => x.word === search)._definitions;
      for (let i = 0; i < sth.length; i++) {
        this.newArr.push(sth[i]['definition']);
      }
    });
    return this.newArr;
  }
}
