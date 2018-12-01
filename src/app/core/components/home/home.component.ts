import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user-service';
import {SelectWordService} from '../../../services/select-word-service';
import {WordTranslationService} from '../../../services/word-translation-service';
import {WebScrapeService} from '../../../services/web-scrape-service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PopOverComponent} from './pop-over/pop-over.component';
import 'rxjs/add/observable/interval';
import {SideDrawerComponent} from './side-drawer/side-drawer.component';
import {UserWordDatabaseService} from '../../../services/user-word-database-service';
import {Entry} from '../../../model/entry';
import {Observable} from 'rxjs';
import {ComponentCanDeactivate} from '../../../services/can-deactivate-guard';
import {DialogService} from '../../../services/dialog-service';
import {FileUploadService} from '../../../services/file-upload-service';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  selector: 'app-home',
})
export class HomeComponent implements OnInit, ComponentCanDeactivate {
  constructor(private http: HttpClient
    , private userService: UserService
    , private sws: SelectWordService
    , private wts: WordTranslationService
    , private wss: WebScrapeService
    , private dialog: MatDialog
    , private uwds: UserWordDatabaseService
              , public dialogService: DialogService
              , private fus: FileUploadService, private router: Router) {
  }
  toggleWebPdf: boolean;
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
    // this.one = document.getElementById('test');
    // this.shadow = this.one.attachShadow({mode: 'closed'});
    // if (localStorage.getItem('username') !== 'demo') {
    //   this.isDemo = false;
    //   if (localStorage.getItem('url') !== '' && localStorage.getItem('url') !== null) {
    //     this.wss.getStringedWeb(localStorage.getItem('url')).subscribe(data => {
    //       this.shadow.innerHTML = '<p>' + data + '</p>';
    //     });
    //   }
    // }
    // if (localStorage.getItem('username') === 'demo') {
    //   this.isDemo = true;
    //   this.wss.getStringedWeb('https://short-edition.com/en/story/1-min/exile-7').subscribe(data => {
    //     this.shadow.innerHTML = '<p>' + data + '</p>';
    //   });
    // }
    // this.fus.listFolders().then(data => {
    //   this.listOfFoldersInDropbox = data;
    // });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return false;
  }

  // wordSelection() {
  //   this.tmpWord = this.sws.selectWord(this.tmpWord);
  //   this.popOverDialogRef = this.dialog.open(PopOverComponent, {
  //     data: {
  //       word: this.tmpWord,
  //       url: this.url,
  //     },
  //     panelClass: 'wordBox'
  //
  //   });
  //
  // }
  //
  // getDom() {
  //   if (this.urlRegEx.test(this.url)) {
  //     localStorage.setItem('url', this.url);
  //     this.wss.getStringedWeb(this.url).subscribe(data => {
  //       this.shadow.innerHTML = '<p>' + data + '</p>';
  //     });
  //   } else {
  //     alert('Put the correct URL');
  //   }
  // }
  //
  // getJsonResponse(word): void {
  //   this.definitions = this.wts.getResponse(word);
  // }
  //
  //
  // removeWord(element, array) {
  //   const index = array.indexOf(element);
  //
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //   }
  // }
  //
  // fireEvent(e) {
  //   e.preventDefault();
  // }
  //
  // saveUrl(url) {
  //   this.userService.sendUrlToBackend(url);
  // }
  //
  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  // }
  //
  // uploadFileToActivity() {
  //   if (!this.listOfFoldersInDropbox.includes(localStorage.getItem('username'))) {
  //     this.fus.createFolder(localStorage.getItem('username'));
  //   }
  //   this.fus.postFile(this.fileToUpload);
  //     }
  //
  // downloadFileFromDropbox() {
  //   this.fus.downloadFile().then(data => {
  //     console.log(data);
  //     this.pdfFile = data;
  //   });
  // }
  //
  // listPdfFilesInDropbox() {
  //   this.listOfFoldersInDropbox = [];
  //   this.fus.listPdfFiles().then(data => {
  //     this.listOfFilesInDropbox = data;
  //   });
  // }
  //
  // listFoldersInDropbox() {
  //   this.fus.listFolders().then(data => {
  //     this.listOfFoldersInDropbox = data;
  //   });
  // }
  //
  // removeFile(l: any) {
  //   this.fus.deleteFile(l);
  //   this.listOfFilesInDropbox.splice(this.listOfFilesInDropbox.indexOf(l), 1);
  // }
  goToWebpage() {
    this.router.navigateByUrl('webpage');
  }

  goToDocument() {
    this.router.navigateByUrl('document');
  }
}
