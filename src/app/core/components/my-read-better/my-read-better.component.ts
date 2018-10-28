import { Component, OnInit } from '@angular/core';
import {UserWordDatabaseService} from '../../../services/user-word-database-service';
import {UserService} from '../../../services/user-service';
import {WordTranslationService} from '../../../services/word-translation-service';
import {map} from 'rxjs/operators';
import {stringify} from 'querystring';
import {Definition} from '../../../model/definition';

@Component({
  selector: 'app-my-read-better',
  templateUrl: './my-read-better.component.html',
  styleUrls: ['./my-read-better.component.css']
})
export class MyReadBetterComponent implements OnInit {
  tableOfWords = this.uwds.tableOfWords;
  constructor(private uwds: UserWordDatabaseService, private us: UserService, private wts: WordTranslationService) { }
myListOfWords = this.uwds.tableOfWords;
  ngOnInit() {
  }

sendAllToBackend () {
  // const definitions = this.tableOfWords[0]['definitions'];
    // let definitions  = new Array<Definition>();
  // definitions = this.wts.getResponse('domain');
  const entry = this.tableOfWords[0];
          this.us.sendToBackend(this.tableOfWords);
   }

  showthearray() {
    console.log(this.wts.getMyJson('domain'));
  }
}
