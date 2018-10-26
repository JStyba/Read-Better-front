import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WordTranslationService} from '../../../../services/word-translation-service';
import {UserWordDatabaseService} from '../../../../services/user-word-database-service';
import {Entry} from '../../../../model/entry';

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
  ) {}
word;
  definitions;
  ngOnInit() {
    this.word = this.data['word'];
    }
translate () {
  this.definitions = this.wts.getResponse(this.word);
}

  AddToDb() {
    // this.uwds.addWordToDatabase(this.data['word']);
    const newEntry = <Entry>({
      entryId: this.word,
      definition: this.wts.getResponse(this.word),
      // timestamp: Math.floor((new Date).getTime() / 1000),
      timestamp: new Date(),
      urlEntry: this.data['url']
    });
    this.uwds.addWordToDatabase(newEntry);
  }
}
