import {AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserWordDatabaseService} from '../../../../services/user-word-database-service';
import {WordTranslationService} from '../../../../services/word-translation-service';
import {Entry} from '../../../../model/entry';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.css']
})
export class SideDrawerComponent implements AfterViewInit {

  constructor(private wts: WordTranslationService, private uwds: UserWordDatabaseService) {
  }

  tableOfWords = this.uwds.tableOfWords;
  @ViewChild('StickySideDrawer') menuElement: ElementRef;
  sideDrawer = false;
  elementPosition: any;
  definitions = [];
  translatedWord = '';

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sideDrawer = true;
    } else {
      this.sideDrawer = false;
    }
  }

  translate(word) {
    this.translatedWord = word;
    this.definitions = this.wts.getResponse(word);
  }
  translatePl(word) {
    this.translatedWord = word;
    this.definitions = this.wts.getResponsePl(word);
  }
  remove(element, array) {
    this.uwds.removeWord(element, array);
  }

  hideDef() {
    this.definitions = [];
    this.translatedWord = '';
  }
}
