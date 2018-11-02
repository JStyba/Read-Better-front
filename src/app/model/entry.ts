
interface EntryInterface {
  word: string;
  definitions?: string[];
  timestamp: any;
  entryUrl: string;
}


export class Entry implements EntryInterface {

  word: string;
  definitions: string [];
  timestamp: any;
  entryUrl: string;


  constructor(word: string, timestamp: any, entryUrl: string, definitions?: string[]) {
    this.word = word;
    this.definitions = definitions;
    this.timestamp = timestamp;
    this.entryUrl = entryUrl;
  }
}
