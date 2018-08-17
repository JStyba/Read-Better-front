import {Component, EventEmitter, Output} from '@angular/core';

import {HttpModule, Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {post} from 'selenium-webdriver/http';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  @Output() userClick: EventEmitter<any> = new EventEmitter();

  public constructor(private http: HttpClient) {
  }

  tmpWordTranslation = null;
  tableOfWords: String[] = [];
  tmpWord: String = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'app_id': '3c699787',
      'app_key': '4a30da605e25de91cf692d808bdb069d'
    })
  };

  selectWord() {
    const s = window.getSelection();
    const range = s.getRangeAt(0);
    const node = s.anchorNode;
    while (range.toString().indexOf(' ') !== 0) {
      range.setStart(node, (range.startOffset - 1));
    }
    range.setStart(node, range.startOffset + 1);
    do {
      range.setEnd(node, range.endOffset + 1);

    } while (range.toString().indexOf(' ') === -1 && range.toString().trim() !== '');
    const str = range.toString().trim();
    console.log('this word was clicked: ' + str.trim().toString() + 'the type of str is: ' + typeof str);
    this.tableOfWords.push(str);
    for (let i = 0; i < this.tableOfWords.length; i++) {
      console.log(this.tableOfWords[i]);
      this.tmpWord = str;
    }
  }

  removeWord(element, array) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }


  getResponse(word) {

    const username = 'user';
    const password = 'password1';
    const auth = btoa(username + ':' + password);
    const params = new HttpParams().set('word', word);
    this.http.get('http://localhost:8080/', {params}).subscribe(json => {
      console.log(json);
     // this.tmpWordTranslation = JSON.parse(json);
      console.log('this should come from tmpWord: ' + this.tmpWordTranslation);
    });
  }

}


// && range.endOffset < node.length - might need it later
