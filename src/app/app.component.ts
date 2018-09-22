import {ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {BackEndConnectionService} from './dict/back-end-connection-service';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {TargetPageComponent} from './dict/target-page/target-page.component';

export interface TextSelectEvent {
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BackEndConnectionService]
})

export class AppComponent {
  public constructor(private http: HttpClient, private backendConnectionService: BackEndConnectionService) {
    }
  url = '';
  parser = new DOMParser();
  word = null;
  definitions;
  tableOfWords: String[] = [];
  tmpWord: String = '';
  private getRangeContainer(range: Range): Node {
    let container = range.commonAncestorContainer;
    while (container.nodeType !== Node.ELEMENT_NODE) {
      container = container.parentNode;
    }
    return (container);
  }

  selectWord() {
    const selection = document.getSelection();
    if (!selection.rangeCount || !selection.toString()) {
      return;
    }
    const range = selection.getRangeAt(0);
    const rangeContainer = this.getRangeContainer(range);
    this.tmpWord = selection.toString().trim();
    console.log(this.tmpWord);
  }

  removeWord(element, array) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  getJsonResponse(word): void {
    this.definitions = this.backendConnectionService.getResponse(word);
  }

  addWordToDatabase() {
    if (this.tmpWord !== '') {
      this.tableOfWords.push(this.tmpWord);
    } else {
      alert('no word to add');
    }
  }

  fireEvent(e) {
    e.preventDefault();
  }

  getDom() {
    console.log(this.url);
    const one = document.getElementById('test');
    this.backendConnectionService.getStringedWeb(this.url).subscribe(data => {
      const shadow = one.attachShadow({mode: 'closed'});
      shadow.innerHTML = '<p>' + data + '</p>';
    });
    document.getElementById('test').innerHTML = '';
  }
}


