import {Repetition} from './repetition.enum';

interface EntryInterface {
  word: string;
  definitions?: string[];
  timestamp: any;
  entryUrl?: string;
  file?: string;
  repetition: string;
  language: string;
}


export class Entry implements EntryInterface {

  private _word: string;
  private _definitions: string [];
  private _timestamp: any;
  private _entryUrl: string;
  private _file: string;
  private _repetition: string;
  private _language: string;


  constructor(
    word: string,
    timestamp: any,
    repetition: string,
    language: string,
    entryUrl?: string,
    definitions?: string[],
    file?: string) {
    this._word = word;
    this._definitions = definitions;
    this._timestamp = timestamp;
    this._entryUrl = entryUrl;
    this._file = file;
    this._repetition = repetition;
    this._language = language;
  }

  set definitions(value: string[]) {
    this._definitions = value;
  }

  set word(value: string) {
    this._word = value;
  }

  set timestamp(value: any) {
    this._timestamp = value;
  }

  set entryUrl(value: string) {
    this._entryUrl = value;
  }

  set file(value: string) {
    this._file = value;
  }

  set repetition(value: string) {
    this._repetition = value;
  }

  set language(value: string) {
    this._language = value;
  }
}
