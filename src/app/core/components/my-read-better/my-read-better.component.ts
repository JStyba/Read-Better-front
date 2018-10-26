import { Component, OnInit } from '@angular/core';
import {UserWordDatabaseService} from '../../../services/user-word-database-service';

@Component({
  selector: 'app-my-read-better',
  templateUrl: './my-read-better.component.html',
  styleUrls: ['./my-read-better.component.css']
})
export class MyReadBetterComponent implements OnInit {

  constructor(private uwds: UserWordDatabaseService) { }
myListOfWords = this.uwds.tableOfWords;
  ngOnInit() {
  }
timestampToDate (entryDate: Date) {

// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const clock = entryDate.getTime() * 1000
// Hours part from the timestamp
  const hours = entryDate.getHours();
// Minutes part from the timestamp
  const minutes = '0' + entryDate.getMinutes();
// Seconds part from the timestamp
  const seconds = '0' + entryDate.getSeconds();
const day = entryDate.getDate();
const month = entryDate.getMonth() + 1;
const year = entryDate.getFullYear();
// Will display time in 10:30:23 format
  return  day + '/' + month + '/' + year  + ' at ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}
}
