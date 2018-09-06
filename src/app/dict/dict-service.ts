// import {Injectable} from '@angular/core';
//
// @Injectable
// export class DictService {
//
//   selectWord() {
//     const s = window.getSelection();
//     const range = s.getRangeAt(0);
//     const node = s.anchorNode;
//     while (range.toString().indexOf(' ') !== 0) {
//       range.setStart(node, (range.startOffset - 1));
//     }
//     range.setStart(node, range.startOffset + 1);
//     do {
//       range.setEnd(node, range.endOffset + 1);
//     }
//     while (range.toString().indexOf(' ') === -1 && range.toString().trim() !== '');
//     const str = range.toString().trim();
//     console.log('this word was clicked: ' + str.trim().toString() + 'the type of str is: ' + typeof str);
//     return str;
//     }
//
//
//
//
//
//   }
