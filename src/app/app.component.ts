import {Component, EventEmitter, Output} from '@angular/core';

import {HttpModule, Http, Response, Headers, RequestOptions, JSONPBackend} from '@angular/http';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {post} from 'selenium-webdriver/http';
import {forEach} from '@angular/router/src/utils/collection';
import {stringify} from 'querystring';
import {decoratorArgument} from 'codelyzer/util/astQuery';
import {jsonpFactory} from '@angular/http/src/http_module';
import {catchError} from 'rxjs/operators';
import {tryCatch} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})



export class AppComponent {
  @Output() userClick: EventEmitter<any> = new EventEmitter();

  public constructor(private http: HttpClient) {
  }
    parser = new DOMParser();
  word = null;
  definitions = null;
  jsonString = null;
  tmpWordTranslation = null;
  tableOfWords: String[] = [];
  tmpWord: String = '';
  httpOptions = {


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
    const headers = {'FOO': 'foo', 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cache-Control': 'no-cache'};
    this.http.get('http://192.168.0.106:8080/', {params, headers}).subscribe(json => {
      console.log(json);
      // this.word = json.word;
      // this.definitions = json.definitions;
      // this.tmpWordTranslation = JSON.parse(json);
      console.log('this should come from word: ' + this.word);
      for (let i = 0 ; i < this.definitions.length ; i++){
        console.log(i + ': ' + this.definitions[i]);
      }
    });
    }
}

// && range.endOffset < node.length - might need it later
