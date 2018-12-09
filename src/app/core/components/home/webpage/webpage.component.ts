import {Component, HostListener, OnInit} from '@angular/core';
import {WebScrapeService} from '../../../../services/web-scrape-service';
import {UserWordDatabaseService} from '../../../../services/user-word-database-service';
import {WordTranslationService} from '../../../../services/word-translation-service';
import {FileUploadService} from '../../../../services/file-upload-service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../../services/user-service';
import {SelectWordService} from '../../../../services/select-word-service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Entry} from '../../../../model/entry';
import {PopOverComponent} from '../pop-over/pop-over.component';
import {Observable} from 'rxjs';
import {SideDrawerComponent} from '../side-drawer/side-drawer.component';
import {NgxSpinnerService} from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import {catchError} from 'rxjs/operators';
@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.css']
})
export class WebpageComponent implements OnInit {

  constructor(private http: HttpClient
    , private userService: UserService
    , private sws: SelectWordService
    , private wts: WordTranslationService
    , private wss: WebScrapeService
    , private dialog: MatDialog
    , private uwds: UserWordDatabaseService
    , private fus: FileUploadService) {
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
  isDemo = false;
  fileToUpload: File = null;
  pdfFile;
  listOfFilesInDropbox: any[];
  listOfFoldersInDropbox: any[];

  ngOnInit() {
    this.one = document.getElementById('test');
    this.shadow = this.one.attachShadow({mode: 'closed'});
    if (localStorage.getItem('username') !== 'demo') {
      this.isDemo = false;
      if (localStorage.getItem('url') !== '' && localStorage.getItem('url') !== null) {
        this.wss.getStringedWeb(localStorage.getItem('url')).subscribe(data => {
          this.shadow.innerHTML = '<p>' + data + '</p>';
        });
      }
    }
    if (localStorage.getItem('username') === 'demo') {
      this.isDemo = true;
      this.wss.getStringedWeb('https://short-edition.com/en/story/1-min/exile-7').subscribe(data => {
        this.shadow.innerHTML = '<p>' + data + '</p>';
      });
    }
    this.fus.listFolders().then(data => {
      this.listOfFoldersInDropbox = data;
    });
      }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return false;
  }

  wordSelection() {
    this.tmpWord = this.sws.selectWord(this.tmpWord);
    this.popOverDialogRef = this.dialog.open(PopOverComponent, {
      data: {
        word: this.tmpWord,
        url: this.url,
        isDocument: false
      },
      panelClass: 'wordBox'

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

  getJsonResponse(word): void {
    this.definitions = this.wts.getResponse(word);
  }


  removeWord(element, array) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  fireEvent(e) {
    e.preventDefault();
  }

  saveUrl(url) {
    this.userService.sendUrlToBackend(url);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


}
