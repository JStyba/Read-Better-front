import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class FileUploadService {
  constructor(private httpClient: HttpClient) {
  }

  private _dropboxLink;

  get dropboxLink() {
    return this._dropboxLink;
  }

  postFile(fileToUpload: File) {
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: 'h216sf1_EPIAAAAAAAAK4-MzqpA3y_W7Hc_EyHLcImvhf6kAKmku9MtENvbj9zBG', fetch: fetch});
    // dbx.filesListFolder({path: ''});
    return dbx.filesUpload({path: '/' + localStorage.getItem('username') + '/' + fileToUpload.name, contents: fileToUpload})
      .then(function (response) {
      return response;
            });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  downloadFile(fileName: string) {
    const ACCESS_TOKEN = 'h216sf1_EPIAAAAAAAAK4-MzqpA3y_W7Hc_EyHLcImvhf6kAKmku9MtENvbj9zBG';
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: ACCESS_TOKEN, fetch: fetch});
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
    const ACCESS_TOKEN = 'h216sf1_EPIAAAAAAAAK4-MzqpA3y_W7Hc_EyHLcImvhf6kAKmku9MtENvbj9zBG';
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: ACCESS_TOKEN, fetch: fetch});
    return dbx.filesListFolder({path: '/' + localStorage.getItem('username') + '/'}).then(response => {
      const newArray = [];
      for (let i = 0; i < response.entries.length; i++) {
        newArray.push(response.entries[i].name);
      }
      return newArray;
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  listFolders() {
    const ACCESS_TOKEN = 'h216sf1_EPIAAAAAAAAK4-MzqpA3y_W7Hc_EyHLcImvhf6kAKmku9MtENvbj9zBG';
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: ACCESS_TOKEN, fetch: fetch});
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
    const ACCESS_TOKEN = 'h216sf1_EPIAAAAAAAAK4-MzqpA3y_W7Hc_EyHLcImvhf6kAKmku9MtENvbj9zBG';
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: ACCESS_TOKEN, fetch: fetch});
    dbx.filesListFolder({path: '/' + folderName});
  }
  deleteFile (fileName: string) {
    const ACCESS_TOKEN = 'h216sf1_EPIAAAAAAAAK4-MzqpA3y_W7Hc_EyHLcImvhf6kAKmku9MtENvbj9zBG';
    const fetch = require('isomorphic-fetch');
    const Drop = require('dropbox').Dropbox;
    const dbx = new Drop({accessToken: ACCESS_TOKEN, fetch: fetch});
    dbx.filesDelete({path: '/' + localStorage.getItem('username') + '/' + fileName});
  }
}
