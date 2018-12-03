import {Component, OnInit} from '@angular/core';
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
  totalFileSize;
  pageNumber = 0;

  ngOnInit() {
    // this.one = document.getElementById('test');
    // this.shadow = this.one.attachShadow({mode: 'closed'});
    this.fus.listFolders().then(data => {
      if (isNullOrUndefined(data) || !data.includes(localStorage.getItem('username'))) {
        this.fus.createFolder(localStorage.getItem('username'));
      }
    });
  }

  async uploadFileToActivity() {
    if (!this.fileToUpload.name.endsWith('pdf')) {
      alert('you can only upload PDF files');
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
    console.log('size' + size);
    if (size <= 5242880) {
      this.fus.postFile(this.fileToUpload);
    } else {
      alert('You exceeded 50Mb of storage, delete some other files');
    }
  }

  downloadFileFromDropbox(fileName: string) {
    this.fus.downloadFile(fileName).then(data => {
      console.log(data);
      this.pdfFile = data;
    });
  }

  listPdfFilesInDropbox() {
    this.totalFileSize = 0;
    this.listOfFoldersInDropbox = [];
    this.fus.listPdfFiles().then(data => {
      if (data !== null) {
        this.listOfFilesInDropbox = data[0];
        this.totalFileSize = this.fus.convertBytes(data[1], 2);
      } else {
        this.totalFileSize = 0;
      }
    });
  }

  listFoldersInDropbox() {
    this.fus.listFolders().then(data => {
      this.listOfFoldersInDropbox = data;
    });
  }

  async removeFile(l: any) {
    await this.fus.deleteFile(l).then(data => {
      if (data) {
        this.listOfFilesInDropbox.splice(this.listOfFilesInDropbox.indexOf(l), 1);
        this.listPdfFilesInDropbox();
      }
    });
  }

  wordSelection() {
    this.tmpWord = this.sws.selectWord(this.tmpWord);
    this.popOverDialogRef = this.dialog.open(PopOverComponent, {
      data: {
        word: this.tmpWord,
        url: this.url,
      },
      panelClass: 'wordBox'

    });
  }

  fireEvent(e) {
    e.preventDefault();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  openModal(l: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeFile(l);
      }
    });
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
}
