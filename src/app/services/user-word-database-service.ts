import {Injectable} from '@angular/core';
import {Entry} from '../model/entry';


@Injectable()
export class UserWordDatabaseService {
private _tableOfWords: Entry[] = [];

  get tableOfWords(): Entry[] {
    return this._tableOfWords;
  }

  addWordToDatabase(entry: Entry) {
    if (entry.entryId !== '') {
      this._tableOfWords.push(entry);
      console.log(this._tableOfWords);
    } else {
      alert('No word to add');
    }
  }
  removeWord(element, array) {
    const index = array.indexOf(element);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
