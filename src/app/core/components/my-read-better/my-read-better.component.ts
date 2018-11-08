import {Component, OnInit} from '@angular/core';
import {UserWordDatabaseService} from '../../../services/user-word-database-service';
import {UserService} from '../../../services/user-service';
import {WordTranslationService} from '../../../services/word-translation-service';
import {PopOverComponent} from '../home/pop-over/pop-over.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PopOverRBComponent} from './pop-over-rb/pop-over-rb.component';


@Component({
  selector: 'app-my-read-better',
  templateUrl: './my-read-better.component.html',
  styleUrls: ['./my-read-better.component.css']
})
export class MyReadBetterComponent implements OnInit {
  savedLinks = [];
  tableOfCurrentWords = this.uwds.tableOfWords;
  tableOfDatabaseWords = [];
  popOverDialogRef: MatDialogRef<PopOverRBComponent>;
  tempWordsStatus = false;
  savedWordsStatus = false;
  urlStatus = false;

  constructor(private uwds: UserWordDatabaseService
    , private us: UserService
    , private wts: WordTranslationService
    , private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  toggleElementsTempWords() {
    this.tempWordsStatus = !this.tempWordsStatus;
  }
  toggleElementsSavedWords() {
    this.savedWordsStatus = !this.savedWordsStatus;
  }
  toggleElementsUrl() {
    this.urlStatus = !this.urlStatus;
  }

  sendAllToBackend() {
    this.us.sendToBackend(this.tableOfCurrentWords);
  }

  showLogin() {
    alert(sessionStorage.getItem('username'));
  }

  getAllEntries() {
    this.tableOfDatabaseWords = [];
    this.tableOfDatabaseWords = this.us.getEntriesFromDatabase();
  }

  removeWordFromLocalDatabase(word, array) {
    this.uwds.removeWord(word, array);
  }

  removeWordFromBackendDatabase(word, e: string[]) {
    this.us.removeEntryFromBackend(word).subscribe();
    this.tableOfDatabaseWords.splice(this.tableOfDatabaseWords.indexOf(e), 1);
  }

  translate(word) {
    this.popOverDialogRef = this.dialog.open(PopOverRBComponent, {
      data: {
        word: word,
        language: 'en',
      },
      panelClass: 'wordBox'
    });
  }

  translatePl(word) {
    this.popOverDialogRef = this.dialog.open(PopOverRBComponent, {
      data: {
        word: word,
        language: 'pl',
      },
      panelClass: 'wordBox'

    });
  }

  showSavedLinks() {
    this.savedLinks = [];
    this.savedLinks = this.us.getBrowsingHistoryFromDatabase();
  }

  removeLinkFromBackend(link, table: string[]) {
    this.us.removeUrlFromBackend(link).subscribe();
    this.savedLinks.splice(this.savedLinks.indexOf(table), 1);
  }
}
