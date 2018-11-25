import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user-service';
import {AlertService} from '../../../services/alert-service';
import {first} from 'rxjs/operators';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../services/authentication-service';
import {getToken} from 'codelyzer/angular/styles/cssLexer';
import {AdminService} from '../../../services/admin-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService
    , private alertService: AlertService
    , private router: Router
    , private auth: AuthenticationService
    , private us: UserService
  , private as: AdminService) {
  }

  loading = false;
  submitted = false;
  username: string;
  password: string;
  email: string;

  ngOnInit() {
    this.getToken();
  }

  getToken() {
    this.auth.login('admin', 'stereo').subscribe( r => {
      if (r !== undefined) {
        localStorage.setItem('tmp_token', r['access_token']);
        }
    }, r => {
      alert(r.error.error);
    });
    }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const user = new User(this.username, this.password, this.email);
    this.as.register(user)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          localStorage.removeItem('tmp_token');
          this.router.navigateByUrl('admin');
        },
        error => {
          localStorage.removeItem('tmp_token');
        });
  }

}
