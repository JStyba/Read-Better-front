import {Component, EventEmitter, Output} from '@angular/core';
import {BackEndConnectionService} from './dict/back-end-connection-service';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BackEndConnectionService]

})

export class AppComponent {
  @Output() userClick: EventEmitter<any> = new EventEmitter();

  public constructor(private http: HttpClient, private backendConnectionService: BackEndConnectionService) {
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
    this.tmpWord = str;
    }

  removeWord(element, array) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  getJsonResponse(word): void {
    this.definitions = this.backendConnectionService.getResponse(word);
  }
  addWordToDatabase () {
    if (this.tmpWord !== '') {
      this.tableOfWords.push(this.tmpWord);
    } else {
      alert('no word to add');
    }
  }
  fireEvent(e) {
    e.preventDefault();
  }
}

// && range.endOffset < node.length - might need it later
