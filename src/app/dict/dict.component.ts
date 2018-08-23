
import {Http} from '@angular/http';


export interface JsonEntry {
  word: String;
  definitions: any;
}

class DictComponent {
    constructor(http: Http) {
    }
}
