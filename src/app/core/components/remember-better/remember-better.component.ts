import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user-service';
import {WordTranslationService} from '../../../services/word-translation-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-remember-better',
  templateUrl: './remember-better.component.html',
  styleUrls: ['./remember-better.component.css']
})
export class RememberBetterComponent implements OnInit {
  tableOfDatabaseWords;
  tableOfWordsToLearn;
  i = 0;
  currentWord: string;
  timestamp: string;
  numberOfWords = 0;
  definitions;
  hide = true;
  showCard = false;
  private subscription: Subscription;
  private subscriptions = new Array<Subscription>();
  constructor(private us: UserService, private wts: WordTranslationService) {
      }

  ngOnInit() {
    this.getAllEntriesToLearn();
  }
  showCurrentWord() {
    this.currentWord = this.tableOfWordsToLearn[this.i]._word;
    this.timestamp = this.tableOfWordsToLearn[this.i]._timestamp;
    this.numberOfWords = this.tableOfWordsToLearn.length;
  }

  showDefinitions(w: string) {
    this.definitions = this.wts.getResponseWithSub(w);
    this.hide = false;
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

  getAllEntriesToLearn() {
    this.tableOfWordsToLearn = [];
    this.subscription = this.us.getEntriesFromDatabaseToLearn().subscribe( data => {
      this.tableOfWordsToLearn = data;
      this.showCurrentWord();
          });
  }

  down(w: string) {
    this.us.recordLearning(w, false);
    this.tableOfWordsToLearn.splice(this.tableOfWordsToLearn.indexOf(w), 1);
    this.nextWord();
  }

  up(w: string) {
    this.us.recordLearning(w, true);
    this.tableOfWordsToLearn.splice(this.tableOfWordsToLearn.indexOf(w), 1);
    this.nextWord();
  }

  nextWord() {
    if (this.i < this.tableOfWordsToLearn.length - 1) {
      this.i++;
      this.currentWord = this.tableOfWordsToLearn[this.i]._word;
      this.hide = true;
      this.definitions = [];
    } else {
      this.currentWord = ' There are no more words to learn';
      this.definitions = [];
    }
  }

  previousWord() {
    if (this.i > 0) {
      this.i--;
      this.currentWord = this.tableOfWordsToLearn[this.i]._word;
    }
  }
}
