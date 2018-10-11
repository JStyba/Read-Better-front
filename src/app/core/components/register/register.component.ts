import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user-service';
import {AlertService} from '../../../services/alert-service';
import {first} from 'rxjs/operators';
import {User} from '../../../model/user';
import {stringify} from 'querystring';
import {AuthenticationService} from '../../../services/authentication-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
constructor (private userService: UserService
             , private alertService: AlertService
             , private router: Router
             , private auth: AuthenticationService) {
  this.auth.getToken().subscribe( res => {
    localStorage.setItem('token', res['access_token']);
  });
}
  loading = false;
  submitted = false;

  username: string;
  password: string;
  email: string;

  ngOnInit() {
  }

  onSubmit() {

    alert(localStorage.getItem('token'));
    this.submitted = true;
    this.loading = true;
    const user = new User (this.username, this.password, this.email);
    alert(stringify(user));
    this.userService.register(user)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['login']);
          localStorage.clear();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          localStorage.clear();
        });
  }

}
