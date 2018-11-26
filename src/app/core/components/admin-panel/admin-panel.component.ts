import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin-service';
import saveAs from 'file-saver';
import {UserService} from '../../../services/user-service';
import {Entry} from '../../../model/entry';
import {WordTranslationService} from '../../../services/word-translation-service';
import {Dict} from '../../../model/dict';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  tableOfUsers = [];
  tableOfDatabaseWords: Entry[] = [];
  definitions: string[];
  localDictEntry: Dict[];
  search: string;
  constructor(private router: Router, private as: AdminService, private us: UserService, private wts: WordTranslationService) {
  }

  ngOnInit() {
  }

  register() {
    this.router.navigateByUrl('register');
  }

  listAllUsers() {
    this.tableOfUsers = [];
    this.tableOfUsers = this.as.getAllUsers();
  }


  saveFile() {
    this.tableOfDatabaseWords = [];
    this.tableOfDatabaseWords = this.us.getEntriesFromDatabaseDef();
    const filename = 'test';
    setTimeout(() => {
      const blob = new Blob([JSON.stringify(this.tableOfDatabaseWords)], {type: 'text/plain'});
      saveAs(blob, filename);
    }, 30000);
  }

  getDict(search) {
    this.as.getLocalDict().subscribe( res => {
      this.localDictEntry = res;
      const sth = this.localDictEntry.find(x => x.word === search)._definitions;
      console.log(sth);
          });
  }
}
