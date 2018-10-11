import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user-service';
import {SelectWordService} from '../../../services/select-word-service';
import {WordTranslationService} from '../../../services/word-translation-service';
import {WebScrapeService} from '../../../services/web-scrape-service';


@Component({
  templateUrl: 'home.component.html',
  selector: 'app-home'
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient
    , private userService: UserService
    , private sws: SelectWordService
    , private wts: WordTranslationService
    , private wss: WebScrapeService) {
  }

  tmpWord: String = '';
  urlRegEx = new RegExp('^((https?|ftp|smtp):\\/\\/)?(www.)?[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#-]+\\/?)*$');
  one;
  shadow;
  definitions;
  tableOfWords: String[] = [];
  url = '';
  word = null;

  ngOnInit() {
    this.one = document.getElementById('test');
    this.shadow = this.one.attachShadow({mode: 'closed'});
  }

  showMeTheToken() {
    alert(localStorage.getItem('token'));
  }

  deleteToken() {
    localStorage.clear();
  }

  wordSelection() {
    this.tmpWord = this.sws.selectWord(this.tmpWord);
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

  fireEvent(e) {
    e.preventDefault();
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

  removeWord(element, array) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
