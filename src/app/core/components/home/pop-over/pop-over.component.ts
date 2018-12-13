import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WordTranslationService} from '../../../../services/word-translation-service';
import {UserWordDatabaseService} from '../../../../services/user-word-database-service';
import {Entry} from '../../../../model/entry';
import {serialize} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {UserService} from '../../../../services/user-service';
import {stringify} from 'querystring';
import {DemoService} from '../../../../services/demo-service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.css']
})
export class PopOverComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PopOverComponent>, @Inject(MAT_DIALOG_DATA) public data: any
    , private wts: WordTranslationService
    , private uwds: UserWordDatabaseService
    , private us: UserService
    , private ds: DemoService, private spinner: NgxSpinnerService
  ) {
  }

  word;
  definitions = [];
  isDemo = false;
  transCount = 0;

  ngOnInit() {
    this.word = this.data['word'];
    if (localStorage.getItem('username') === 'demo') {
      this.isDemo = true;
    }
    this.transCount = parseInt(localStorage.getItem('count'), 10);
  }

  translate() {
    if (!this.isDemo || (this.isDemo && this.data.isDocument && this.transCount <= 4)) {
      localStorage.setItem('count', (++this.transCount).toString());
      this.wts.getResponse(this.word).subscribe(res => {
        const evilResp = Object.values(res['definitions']);
        for (const prop in evilResp) {
          if (evilResp !== null) {
            this.definitions.push(Object.values(evilResp[prop]).toString());
          }
        }
      });
    }
    if (this.transCount >= 4 && this.isDemo) {
      alert('You exceeded demo version number of translation');
    }
    if (this.isDemo && !this.data.isDocument) {
      this.definitions = this.ds.getTranslation(this.word);
    }
  }

  translatePl() {
    this.definitions = this.wts.getResponsePl(this.word);
  }

  AddToDb() {
    /*-------------- IS DEMO ----------------*/
    if (this.isDemo) {
      if (this.data.isDocument === true) {
        const def = this.wts.getResponseWithSub(this.word);
        const newEntry = <Entry>({
          word: this.word,
          definitions: def,
          // timestamp: Math.floor((new Date).getTime() / 1000),
          timestamp: this.us.timestampToDate(new Date()),
          file: this.data.file
        });
        this.uwds.addWordToDatabase(newEntry);
      } else {
        const def = this.ds.getTranslation(this.word);
        const newEntry = <Entry>({
          word: this.word,
          definitions: def,
          // timestamp: Math.floor((new Date).getTime() / 1000),
          timestamp: this.us.timestampToDate(new Date()),
          entryUrl: 'https://short-edition.com/en/story/1-min/exile-7'
        });
        this.uwds.addWordToDatabase(newEntry);
      }
    }
    /*-------------- NOT DEMO ----------------*/
    if (!this.isDemo) {
      if (this.data.isDocument === true) {
        const def = this.wts.getResponseWithSub(this.word);
        const newEntry = <Entry>({
          word: this.word,
          definitions: def,
          // timestamp: Math.floor((new Date).getTime() / 1000),
          timestamp: this.us.timestampToDate(new Date()),
          file: this.data.file
        });
        this.uwds.addWordToDatabase(newEntry);
      }
    } if (this.data.isDocument === false) {
      console.log('here');
      const def = this.wts.getResponseWithSub(this.word);
      const newEntry = <Entry>({
        word: this.word,
        definitions: def,
        // timestamp: Math.floor((new Date).getTime() / 1000),
        timestamp: this.us.timestampToDate(new Date()),
        entryUrl: localStorage.getItem('url'),
      });
      this.uwds.addWordToDatabase(newEntry);
    }
  }
}
