import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {WebScrapeService} from '../../../../services/web-scrape-service';
import {UserWordDatabaseService} from '../../../../services/user-word-database-service';
import {WordTranslationService} from '../../../../services/word-translation-service';
import {FileUploadService} from '../../../../services/file-upload-service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../../services/user-service';
import {SelectWordService} from '../../../../services/select-word-service';
import {DialogService} from '../../../../services/dialog-service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Entry} from '../../../../model/entry';
import {PopOverComponent} from '../pop-over/pop-over.component';
import {SideDrawerComponent} from '../side-drawer/side-drawer.component';
import {ConfirmationDialogComponent} from '../../../../services/confirmation-dialog/confirmation-dialog.component';
import {isNullOrUndefined} from 'util';
import {NgxSpinnerService} from 'ngx-spinner';
import {PDFProgressData} from 'pdfjs-dist';
import {ScrollToService} from 'ng2-scroll-to-el';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {


  constructor(private http: HttpClient
    , private userService: UserService
    , private sws: SelectWordService
    , private wts: WordTranslationService
    , private wss: WebScrapeService
    , private dialog: MatDialog
    , private uwds: UserWordDatabaseService
    , public dialogService: DialogService
    , private fus: FileUploadService, private spinner: NgxSpinnerService, private scrollService: ScrollToService) {
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
  listOfFoldersInDropbox: any[];
  pageNumber = 0;
  ngOnInit() {
    // this.one = document.getElementById('test');
    // this.shadow = this.one.attachShadow({mode: 'closed'});
    this.fus.listFolders().then(data => {
      if (isNullOrUndefined(data) || !data.includes(localStorage.getItem('username'))) {
        this.fus.createFolder(localStorage.getItem('username'));
      }
    });
    if (localStorage.getItem('username') === 'demo') {
      this.isDemo = true;
      localStorage.setItem('count', '0');
    }
  }
  async uploadFileToActivity() {
    if (!this.fileToUpload.name.endsWith('pdf')) {
      alert('You can only upload PDF files');
      return;
    } else if (this.fileToUpload.size >= 5242880) {
      alert('Maximum file size is 5MB');
      return;
    }
    let size = 0;
    await this.fus.listPdfFiles().then(data => {
      if (data !== null) {
        size = data[1];
      } else {
        size = 0;
      }
    });
    if (size <= 52428800) {
      this.fus.postFile(this.fileToUpload);
    } else {
      alert('You exceeded 50Mb of storage, delete some other files');
    }
  }
 listFoldersInDropbox() {
    this.fus.listFolders().then(data => {
      this.listOfFoldersInDropbox = data;
    });
  }

pdfFileDownloadedHandler (file: any) {
    this.pdfFile = file;
}

  wordSelection() {
    this.tmpWord = this.sws.selectWord(this.tmpWord);
    this.popOverDialogRef = this.dialog.open(PopOverComponent, {
      data: {
        word: this.tmpWord,
        url: this.url,
        file: localStorage.getItem('file'),
        isDocument: true,
       },
      panelClass: 'wordBox'
    });
  }
  onProgress(progressData: PDFProgressData) {
  }
  afterLoadComplete(pdfData: any) {
    if (pdfData.numPages > 0) {
      console.log(pdfData.numPages);
      this.spinner.hide();
      this.scroll();
     }
    // console.log(pdfData);
  }
  scroll() {
    const sth = document.getElementById('prop');
    sth.scrollIntoView();
  }
  fireEvent(e) {
    e.preventDefault();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }



  pageBack() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
    }
  }

  pageForward() {
    this.pageNumber++;
  }

  setPageNumber(number) {
   this.pageNumber = number;
   }

  demoMsg() {
    alert('Option not available in demo mode');
  }
}
