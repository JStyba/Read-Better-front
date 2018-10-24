import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user-service';
import {SelectWordService} from '../../../services/select-word-service';
import {WordTranslationService} from '../../../services/word-translation-service';
import {WebScrapeService} from '../../../services/web-scrape-service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PopOverComponent} from './pop-over/pop-over.component';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/interval';


@Component({
  templateUrl: 'home.component.html',
  selector: 'app-home'
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient
    , private userService: UserService
    , private sws: SelectWordService
    , private wts: WordTranslationService
    , private wss: WebScrapeService
              , private dialog: MatDialog) {
  }
popOverDialogRef: MatDialogRef<PopOverComponent>;
  tmpWord: String = '';
  // www.waitbutwhy.com/2018/04/picking-career.html
  urlRegEx = new RegExp('^((https?|ftp|smtp):\\/\\/)?(www.)?');
  one;
  shadow;
  definitions;
  tableOfWords: String[] = [];
  url = '';
  word = null;
message = 'some text';
  ngOnInit() {
    this.one = document.getElementById('test');
    this.shadow = this.one.attachShadow({mode: 'closed'});
  }
  openTranslateFileDialog() {
    this.popOverDialogRef = this.dialog.open(PopOverComponent, {
      hasBackdrop: false
    });
  }
   showMeTheToken() {
    alert(localStorage.getItem('token'));
  }

  deleteToken() {
    localStorage.clear();
  }

  wordSelection() {
    this.tmpWord = this.sws.selectWord(this.tmpWord);
    this.popOverDialogRef = this.dialog.open(PopOverComponent, {
      data: {
       word: this.tmpWord
      }
    });

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
