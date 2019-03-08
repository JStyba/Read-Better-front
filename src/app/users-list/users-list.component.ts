import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin-service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  private tableOfUsers = [];
  constructor(private as: AdminService) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.tableOfUsers = [];
    this.tableOfUsers = this.as.getAllUsers();
  }
}
