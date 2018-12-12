import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserWordDatabaseService} from '../../../../services/user-word-database-service';
import {WordTranslationService} from '../../../../services/word-translation-service';
import {DemoService} from '../../../../services/demo-service';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.css']
})
export class SideDrawerComponent implements AfterViewInit, OnInit {

  constructor(private wts: WordTranslationService, private uwds: UserWordDatabaseService, private ds: DemoService) {
  }

  tableOfWords = this.uwds.tableOfWords;
  @ViewChild('StickySideDrawer') menuElement: ElementRef;
  sideDrawer = false;
  elementPosition: any;
  definitions = [];
  translatedWord = '';
  isDemo = false;
  transCount;

  ngOnInit() {
    if (localStorage.getItem('username') === 'demo') {
      this.isDemo = true;
    }
    this.transCount = parseInt(localStorage.getItem('count'), 10);
  }

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
    this.transCount = parseInt(localStorage.getItem('count'), 10);
    if (!this.isDemo || (this.isDemo && localStorage.getItem('file'))) {
      if (this.transCount > 4) {
        alert('You exceeded the number of English translations');
      } else {
        this.translatedWord = word;
        this.definitions = this.wts.getResponseWithSub(word);
      }
    } else {
      this.translatedWord = word;
      this.definitions = this.ds.getTranslation(word);
    }
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
