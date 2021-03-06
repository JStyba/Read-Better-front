import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user-service';
import {SelectWordService} from '../../../services/select-word-service';
import {WordTranslationService} from '../../../services/word-translation-service';
import {WebScrapeService} from '../../../services/web-scrape-service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PopOverComponent} from './pop-over/pop-over.component';
import 'rxjs/add/observable/interval';
import {SideDrawerComponent} from './side-drawer/side-drawer.component';
import {UserWordDatabaseService} from '../../../services/user-word-database-service';
import {Entry} from '../../../model/entry';
import {Observable} from 'rxjs';
import {ComponentCanDeactivate} from '../../../services/can-deactivate-guard';
import {DialogService} from '../../../services/dialog-service';
import {FileUploadService} from '../../../services/file-upload-service';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  selector: 'app-home',
})
export class HomeComponent implements OnInit, ComponentCanDeactivate {
  constructor(private http: HttpClient
    , private userService: UserService
    , private sws: SelectWordService
    , private wts: WordTranslationService
    , private wss: WebScrapeService
    , private dialog: MatDialog
    , private uwds: UserWordDatabaseService
    , public dialogService: DialogService
    , private fus: FileUploadService, private router: Router) {
  }

  urlRegEx = new RegExp('^((https?|ftp|smtp):\\/\\/)?(www.)?');
  definitions;
  tableOfWords: Entry[] = this.uwds.tableOfWords;
  url = '';
  word = null;
  isDemo = false;

  ngOnInit() {
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return false;
  }

  goToWebpage() {
    this.router.navigateByUrl('webpage');
  }

  goToDocument() {
    this.router.navigateByUrl('document');
  }
}
