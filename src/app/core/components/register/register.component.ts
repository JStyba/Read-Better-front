import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user-service';
import {AlertService} from '../../../services/alert-service';
import {first} from 'rxjs/operators';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../services/authentication-service';
import {getToken} from 'codelyzer/angular/styles/cssLexer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
constructor (private userService: UserService
             , private alertService: AlertService
             , private router: Router
             , private auth: AuthenticationService
, private us: UserService) {
    }
  loading = false;
  submitted = false;

  username: string;
  password: string;
  email: string;

  ngOnInit() {
        this.us.getToken();
          }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const user = new User (this.username, this.password, this.email);
    this.userService.register(user)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['login']);
          localStorage.clear();
        },
        error => {
          localStorage.clear();
        });
  }

}
