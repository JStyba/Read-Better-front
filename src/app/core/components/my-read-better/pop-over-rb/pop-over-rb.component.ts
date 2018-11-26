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

@Component({
  selector: 'app-pop-over-rb',
  templateUrl: './pop-over-rb.component.html',
  styleUrls: ['./pop-over-rb.component.css']
})
export class PopOverRBComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PopOverRBComponent>, @Inject(MAT_DIALOG_DATA) public data: any
    , private wts: WordTranslationService
    , private uwds: UserWordDatabaseService
    , private us: UserService
    , private ds: DemoService
  ) {
  }

  word;
  definitions;

  ngOnInit() {
    this.word = this.data['word'];
    if (this.data['language'] === 'en') {
      this.translate();
    }
    if (this.data['language'] === 'pl') {
      this.translatePl();
    }
  }

  translate() {
    if (localStorage.getItem('username') !== 'demo') {
      this.definitions = this.wts.getResponse(this.word);
    }
    if (localStorage.getItem('username') === 'demo') {
      this.definitions = this.ds.getTranslation(this.word);
    }
  }
  translatePl() {
    this.definitions = this.wts.getResponsePl(this.word);
  }
  }


