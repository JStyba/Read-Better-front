import {Component} from '@angular/core';
import {WordTranslationService} from './dict/word-translation-service';
import {HttpClient} from '@angular/common/http';
import {WebScrapeService} from './dict/web-scrape-service';
import {SelectWordService} from './dict/select-word-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WordTranslationService, WebScrapeService, SelectWordService]
})

export class AppComponent {
  public constructor(private http: HttpClient
    , private wts: WordTranslationService
    , private wss: WebScrapeService
    , private sws: SelectWordService) {
  }

  urlRegEx = new RegExp('^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$');
  url = '';
  word = null;
  definitions;
  tableOfWords: String[] = [];
  tmpWord: String = '';

  wordSelection() {
    this.tmpWord = this.sws.selectWord(this.tmpWord);
  }

  removeWord(element, array) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  getJsonResponse(word): void {
    this.definitions = this.wts.getResponse(word);
  }

  addWordToDatabase() {
    if (this.tmpWord !== '') {
      this.tableOfWords.push(this.tmpWord);
    } else {
      alert('no word to add');
    }
  }

  fireEvent(e) {
    e.preventDefault();
  }

  getDom() {
    if (this.urlRegEx.test(this.url)) {
      const one = document.getElementById('test');
      this.wss.getStringedWeb(this.url).subscribe(data => {
        const shadow = one.attachShadow({mode: 'closed'});
        shadow.innerHTML = '<p>' + data + '</p>';
      });
      document.getElementById('test').innerHTML = '';
    } else {
      alert('Put the correct URL');
    }
  }
}


