import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-dict',
  templateUrl: 'app.component.html'
})
class DictComponent {
    constructor(http: Http) {
    }
}
