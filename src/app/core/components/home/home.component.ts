import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user-service';
import {SelectWordService} from '../../../services/select-word-service';
import {WordTranslationService} from '../../../services/word-translation-service';
import {WebScrapeService} from '../../../services/web-scrape-service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PopOverComponent} from './pop-over/pop-over.component';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/interval';
import {SideDrawerComponent} from './side-drawer/side-drawer.component';
import {UserWordDatabaseService} from '../../../services/user-word-database-service';
import {Entry} from '../../../model/entry';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  selector: 'app-home'
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient
    , private userService: UserService
    , private sws: SelectWordService
    , private wts: WordTranslationService
    , private wss: WebScrapeService
    , private dialog: MatDialog
    , private uwds: UserWordDatabaseService) {
  }
  popOverDialogRef: MatDialogRef<PopOverComponent>;
  sideDrawerDialogRef: MatDialogRef<SideDrawerComponent>;
  tmpWord: String = '';
  urlRegEx = new RegExp('^((https?|ftp|smtp):\\/\\/)?(www.)?');
  one;
  shadow;
  definitions;
  tableOfWords: Entry[] = this.uwds.tableOfWords;
  url = '';
  word = null;
    ngOnInit() {
    this.one = document.getElementById('test');
    this.shadow = this.one.attachShadow({mode: 'closed'});
    if (localStorage.getItem('url')) {
      this.wss.getStringedWeb(localStorage.getItem('url')).subscribe(data => {
        this.shadow.innerHTML = '<p>' + data + '</p>';
      });
    }
      }

  openSideDrawerDialog() {
    this.sideDrawerDialogRef = this.dialog.open(SideDrawerComponent, {
      hasBackdrop: true
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
        word: this.tmpWord,
        url: this.url
      }
    });

  }

  getDom() {
    if (this.urlRegEx.test(this.url)) {
      localStorage.setItem('url', this.url);
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



  removeWord(element, array) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
