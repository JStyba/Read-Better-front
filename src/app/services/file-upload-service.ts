import {Injectable} from '@angular/core';
import {DataService} from './data-service';
import {isNullOrUndefined} from 'util';
import {catchError} from 'rxjs/operators';

@Injectable()
export class FileUploadService {
  constructor(private ds: DataService) {
  }

  private _dropboxLink;
  totalSize;

  get dropboxLink() {
    return this._dropboxLink;
  }

  postFile(fileToUpload: File) {
    if (fileToUpload.size < 1048576) {
      const fetch = require('isomorphic-fetch');
      const Drop = require('dropbox').Dropbox;
      const dbx = new Drop({accessToken: this.ds.dropboxToken, fetch: fetch});
      // dbx.filesListFolder({path: ''});
      return dbx.filesUpload({path: '/' + localStorage.getItem('username') + '/' + fileToUpload.name, contents: fileToUpload})
        .then(function (response) {
          return response;
        });
    } else { alert('file is too big'); }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  downloadFile(fileName: string) {
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: this.ds.dropboxToken, fetch: fetch});
    return dbx.filesGetTemporaryLink({path: '/' + localStorage.getItem('username') + '/' + fileName}).then(response => {
      const link = document.createElement('a');
      link.href = response.link;
      return link.href.toString();
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  listPdfFiles() {
    let total = 0;
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: this.ds.dropboxToken, fetch: fetch});
    return dbx.filesListFolder({path: '/' + localStorage.getItem('username') + '/'}).then(response => {
      const newArray = [[], []];
      if (response.entries.length !== 0) {
        for (let i = 0; i < response.entries.length; i++) {
          newArray[0].push(response.entries[i].name);
          total += (response.entries[i].size);
        }
        newArray[1].push(total);
        return newArray;
      } else { return null; }
    }).catch(function (error) {
      console.log(error);
    });
  }

  listFolders() {
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: this.ds.dropboxToken, fetch: fetch});
    return dbx.filesListFolder({path: ''}).then(response => {
      const newArray = [];
      for (let i = 0; i < response.entries.length; i++) {

        if (response.entries[i]['.tag'] === 'folder') {
          newArray.push(response.entries[i].name);
                  }
      }
      return newArray;
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }
  createFolder(folderName: string) {
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: this.ds.dropboxToken, fetch: fetch});
    return dbx.filesCreateFolderV2({path: '/' + folderName}).then( response => {
              return 'folder created';
          });
  }
  deleteFile (fileName: string) {
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: this.ds.dropboxToken, fetch: fetch});
    return dbx.filesDelete({path: '/' + localStorage.getItem('username') + '/' + fileName});
  }
  convertBytes(bytes, decimals) {
    if (bytes === 0 || isNullOrUndefined(bytes)) { return 0; }
    const k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
