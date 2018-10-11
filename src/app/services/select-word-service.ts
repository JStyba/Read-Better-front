import {Injectable} from '@angular/core';

@Injectable()
export class SelectWordService {

  getRangeContainer(range: Range): Node {
    let container = range.commonAncestorContainer;
    while (container.nodeType !== Node.ELEMENT_NODE) {
      container = container.parentNode;
    }
    return (container);
  }

  selectWord(tmpWord) {
    const selection = document.getSelection();
    if (!selection.rangeCount || !selection.toString()) {
      return;
    }
    const range = selection.getRangeAt(0);
    const rangeContainer = this.getRangeContainer(range);
    return tmpWord = selection.toString().trim();
    }

  }
