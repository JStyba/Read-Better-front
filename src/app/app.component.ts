import {Component, OnInit} from '@angular/core';
import {WordTranslationService} from './dict/word-translation-service';
import {HttpClient} from '@angular/common/http';
import {WebScrapeService} from './dict/web-scrape-service';
import {SelectWordService} from './dict/select-word-service';
import {root} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WordTranslationService, WebScrapeService, SelectWordService]
})

export class AppComponent implements OnInit {
  public constructor(private http: HttpClient
    , private wts: WordTranslationService
    , private wss: WebScrapeService
    , private sws: SelectWordService) {
  }
  hover;
  one;
  urlRegEx = new RegExp('^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$');
  url = '';
  word = null;
  definitions;
  tableOfWords: String[] = [];
  tmpWord: String = '';
  shadow;
  ngOnInit () {
    this.one = document.getElementById('test');
    this.shadow = this.one.attachShadow({mode: 'closed'});
  }
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
      alert('No word to add');
    }
  }

  fireEvent(e) {
    e.preventDefault();
  }

  getDom() {
    if (this.urlRegEx.test(this.url)) {
          this.wss.getStringedWeb(this.url).subscribe(data => {
          this.shadow.innerHTML = '<p>' + data + '</p>';
        });
      } else {
      alert('Put the correct URL');
    }
  }
    /* STYLING */
}


