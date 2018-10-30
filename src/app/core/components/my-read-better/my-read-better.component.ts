import {Component, OnInit} from '@angular/core';
import {UserWordDatabaseService} from '../../../services/user-word-database-service';
import {UserService} from '../../../services/user-service';
import {WordTranslationService} from '../../../services/word-translation-service';


@Component({
  selector: 'app-my-read-better',
  templateUrl: './my-read-better.component.html',
  styleUrls: ['./my-read-better.component.css']
})
export class MyReadBetterComponent implements OnInit {
  tableOfCurrentWords = this.uwds.tableOfWords;
  tableOfDatabaseWords = [];

  constructor(private uwds: UserWordDatabaseService
              , private us: UserService
              , private wts: WordTranslationService) {
  }

  myListOfWords = this.uwds.tableOfWords;

  ngOnInit() {
  }

  sendAllToBackend() {
    this.us.sendToBackend(this.tableOfCurrentWords);
  }

  showLogin() {
    alert(sessionStorage.getItem('username'));
  }
  getAllEntries () {
    this.tableOfDatabaseWords = [];
this.tableOfDatabaseWords = this.us.getEntriesFromDatabase();
  }
}
