import {Component} from '@angular/core';
import {WordTranslationService} from './services/word-translation-service';
import {WebScrapeService} from './services/web-scrape-service';
import {SelectWordService} from './services/select-word-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WordTranslationService, WebScrapeService, SelectWordService]
})

export class AppComponent {
    public constructor(
  ) {}

  }


