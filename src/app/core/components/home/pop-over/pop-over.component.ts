import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WordTranslationService} from '../../../../services/word-translation-service';

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
  ) {}
word;
  definitions;
  ngOnInit() {
    this.word = this.data['word'];
    }
translate () {
  this.definitions = this.wts.getResponse(this.word);
}
}
