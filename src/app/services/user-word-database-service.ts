import {Injectable} from '@angular/core';
import {Entry} from '../model/entry';
import {HttpParams} from '@angular/common/http';


@Injectable()
export class UserWordDatabaseService {
private _tableOfWords: Entry[] = [];
private _modified = false;
  get tableOfWords(): Entry[] {
    return this._tableOfWords;
  }

  get modified(): boolean {
    return this._modified;
  }

  addWordToDatabase(entry: Entry) {
    if (entry.word !== '') {
      this._modified = true;
      this._tableOfWords.push(entry);
      } else {
      alert('No word to add');
    }
  }
  removeWord(element, array) {
    this._modified = true;
    const index = array.indexOf(element);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }


}
