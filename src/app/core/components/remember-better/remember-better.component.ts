import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user-service';

@Component({
  selector: 'app-remember-better',
  templateUrl: './remember-better.component.html',
  styleUrls: ['./remember-better.component.css']
})
export class RememberBetterComponent implements OnInit {
  tableOfDatabaseWords;
  tableOfWordsToLearn;

  constructor(private us: UserService) {
  }

  ngOnInit() {
  }

  getAllEntries() {
    this.tableOfDatabaseWords = [];
    this.tableOfDatabaseWords = this.us.getEntriesFromDatabase();
    for (let i = 0; i < this.tableOfDatabaseWords.length; i++) {
      for (let j = 0; j < this.tableOfDatabaseWords[i].length; j++) {
        console.log(this.tableOfDatabaseWords[i][j]);
      }
    }
    console.log(this.tableOfDatabaseWords);
  }
  getAllEntriesToLearn () {
    this.tableOfWordsToLearn = [];
    this.tableOfWordsToLearn = this.us.getEntriesFromDatabaseToLearn();
  }

  down(w: string) {
this.us.recordLearning(w, false);
  }

  up(w: string) {
    this.us.recordLearning(w, true);
  }
}
