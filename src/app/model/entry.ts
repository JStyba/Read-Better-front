
interface EntryInterface {
  entryId: string;
  definition: string[];
  timestamp: any;
  urlEntry: string;
}


export class Entry implements EntryInterface {

  entryId: string;
  definition: string [];
  timestamp: any;
  urlEntry: string;


  constructor(entryId: string, definition: string[], timestamp: any, urlEntry: string) {
    this.entryId = entryId;
    this.definition = definition;
    this.timestamp = timestamp;
    this.urlEntry = urlEntry;
  }
}
