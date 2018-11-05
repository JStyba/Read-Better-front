import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
goToRegisterPage () {
    this.router.navigateByUrl('register');
  // alert('I am sorry but registering new users is currently disabled. ' +
  //   'If you would like to gain access, please contact me at jarek.styba@gmail.com');
}
goToLoginPage () {
    this.router.navigateByUrl('login');
}

  goToAboutPage() {
    this.router.navigateByUrl('about');
  }
  goToContactPage() {
    this.router.navigateByUrl('contact');
  }
}
