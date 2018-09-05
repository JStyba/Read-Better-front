import {Component, EventEmitter, Output} from '@angular/core';

import {BackEndConnectionService} from './dict/back-end-connection-service';

import {HttpModule, Http, Response, Headers, RequestOptions, JSONPBackend} from '@angular/http';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {DefinitionsPipePipe} from './dict/definitions-pipe.pipe';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BackEndConnectionService, DefinitionsPipePipe]

})



export class AppComponent {
  @Output() userClick: EventEmitter<any> = new EventEmitter();
  private jsonResponse: any = null;

  public constructor(private http: HttpClient, private backendConnectionService: BackEndConnectionService
  , private definitionsPipe: DefinitionsPipePipe) {
  }
    parser = new DOMParser();
  word = null;
  definitions;
  tableOfWords: String[] = [];
  tmpWord: String = '';
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
  // setDefinitions () {
  //   this.definitions = this.backendConnectionService.getDefinitions;
  // }

  getJsonResponse (word): void {
    // console.log(this.backendConnectionService.getResponse(word));
    this.definitions = this.backendConnectionService.getResponse(word);
    // this.backendConnectionService.getResponse(word);
    }
}

// && range.endOffset < node.length - might need it later
