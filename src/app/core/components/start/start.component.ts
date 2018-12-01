import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user-service';
import {AuthenticationService} from '../../../services/authentication-service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private auth: AuthenticationService) { }

  ngOnInit() {
  }
goToRegisterPage () {
    this.auth.login('demo', 'demo').subscribe( r => {
    if (r !== undefined) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', 'demo');
      localStorage.setItem('loggedInAt', new Date().toISOString());
      this.userService.setToken(r['access_token']);
      this.router.navigateByUrl('home');
    }
  }, r => {
    alert(r.error.error);
  });
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
